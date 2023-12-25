import { Redis } from '@upstash/redis/cloudflare';

export default {
	async fetch(request, env, ctx) {
		const { q, query, start } = await request.json();
		const redis = Redis.fromEnv(env);

		const googleApiUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${env.GOOGLE_API_KEY}&cx=${
			env.GOOGLE_SEARCH_ENGINE_ID
		}&q=${encodeURIComponent(q)}&num=10&start=${start}&safe=off`;

		const result = await fetch(googleApiUrl).then((res) => res.json());
		const writes = result.items
			.map((elem, index) => {
				if (elem.link.includes('youtube.com')) {
					return null;
				}
				console.log(JSON.stringify(factory(elem, query, start, index, new Date().toISOString(), q), null, 2));

				return factory(elem, query, start, index, new Date().toISOString(), q);
			})
			.filter(Boolean);

		const batchWriteUrl = `https://firestore.googleapis.com/v1/projects/projectname-o/databases/(default)/documents:batchWrite`;
		const batchWriteResponse = await fetch(batchWriteUrl, {
			method: 'POST',
			body: JSON.stringify({ writes }),
			headers: {
				Authorization: `Bearer ${await redis.get('access_token_projectname-o')}`,

				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());

		console.log(JSON.stringify(batchWriteResponse, null, 2));

		return new Response(JSON.stringify(batchWriteResponse), {
			headers: { 'Content-Type': 'application/json' },
		});
	},
};

function factory(elem, query, start, index, now, q) {
	return {
		update: {
			name: `projects/projectname-o/databases/(default)/documents/QueryResult/${encodeURIComponent(query + start + index)}`, // Construct a unique document name
			fields: {
				title: { stringValue: elem.title },
				url: { stringValue: elem.link },
				snippet: { stringValue: elem.snippet },
				index: { integerValue: index + parseInt(start) },
				query: { stringValue: query },
				created: { timestampValue: now },
				q: { stringValue: q },
				source: { stringValue: 'google' },
			},
		},
	};
}
