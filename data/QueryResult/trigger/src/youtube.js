import { Redis } from '@upstash/redis/cloudflare';
export default {
	async fetch(request, env, ctx) {
		const { q, query } = await request.json();
		const redis = Redis.fromEnv(env);

		const result = await fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${env.GOOGLE_API_KEY}&type=video&maxResults=20`,
		).then((res) => res.json());

		console.log(result);

		if (typeof result.error !== 'undefined' && result.error.code === 403) {
		}

		const writes = result.items.map((elem, index) => videoFactory(elem, index, query, q, new Date().toISOString(), result.items.length));

		const batchWriteResponse = await fetch(
			`https://firestore.googleapis.com/v1/projects/projectname-o/databases/(default)/documents:batchWrite`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${await redis.get('access_token_projectname-o')}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ writes }),
			},
		);

		return new Response(batchWriteResponse.status, { headers: { 'Content-Type': 'application/json' } });
	},
};

function videoFactory(elem, index, query, q, now, resultsCount) {
	return {
		update: {
			name: `projects/projectname-o/databases/(default)/documents/QueryResultVideo/${encodeURIComponent(elem.id.videoId + ';' + query)}`,
			fields: {
				id: {
					stringValue: elem.id.videoId,
				},
				title: {
					stringValue: elem.snippet.title,
				},
				published: {
					timestampValue: elem.snippet.publishedAt,
				},
				index: {
					integerValue: index,
				},
				created: {
					timestampValue: now,
				},
				description: {
					stringValue: elem.snippet.description,
				},
				uploaderId: {
					stringValue: elem.snippet.channelId,
				},
				uploader: {
					stringValue: elem.snippet.channelTitle,
				},
				source: {
					stringValue: 'youtube',
				},
				q: {
					stringValue: q,
				},
				query: {
					stringValue: query,
				},
				results: {
					integerValue: resultsCount,
				},
			},
		},
	};
}
