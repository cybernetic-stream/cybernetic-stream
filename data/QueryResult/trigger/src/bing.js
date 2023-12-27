import { Redis } from '@upstash/redis/cloudflare';

export default {
	async fetch(request, env, ctx) {
		const { q, query } = await request.json();
		const redis = Redis.fromEnv(env);

		const result = await fetch(
			`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(q)}&safeSearch=Off&count=50&responseFilter=webpages`,
			{
				headers: {
					'Ocp-Apim-Subscription-Key': env.BING_API_KEY,
				},
			},
		).then((res) => res.json());
		console.log(JSON.stringify(result));
		const results = result.webPages.value;
		const now = new Date().toISOString();

		const writes = results
			.map((elem, index) => {
				if (elem.url.includes('youtube.com')) {
					return null;
				}

				return {
					update: {
						name: `projects/projectname-o/databases/(default)/documents/QueryResult/${encodeURIComponent(query + index)}`, // Construct a unique document name
						fields: {
							title: { stringValue: elem.name },
							url: { stringValue: elem.url },
							snippet: { stringValue: elem.snippet },
							index: { integerValue: index },
							query: { stringValue: query },
							created: { timestampValue: now },
							q: { stringValue: q },
							source: { stringValue: 'bing' },
						},
					},
				};
			})
			.filter(Boolean); // Filter out null values

		// The rest of your function remains the same
		const batchWriteUrl = `https://firestore.googleapis.com/v1/projects/projectname-o/databases/(default)/documents:batchWrite`;
		const batchWriteResponse = await fetch(batchWriteUrl, {
			method: 'POST',
			body: JSON.stringify({ writes }),
			headers: {
				'Content-Type': 'application/json',

				Authorization: `Bearer ${await redis.get('access_token_projectname-o')}`,

				// Include the Authorization header if needed
			},
		}).then((res) => res.json());

		console.log(JSON.stringify(batchWriteResponse, null, 2));

		return new Response(JSON.stringify(batchWriteResponse, null, 2));
	},
};
