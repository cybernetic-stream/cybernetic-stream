export default {
	async fetch(request, env, context) {
		const data = await request.json();

		context.waitUntil(
			(async () => {
				const q = data.q;
				const query = data.query;

				const google = [];
				for (let i = 0; i < 10; i++) {
					google.push(
						env.google.fetch(
							new Request(request.url, {
								method: 'POST',
								body: JSON.stringify({
									q,
									query,
									start: i * 10,
								}),
							}),
						),
					);
				}

				const bing = env.bing.fetch(
					new Request(request.url, {
						method: 'POST',
						body: JSON.stringify({ q, query }),
					}),
				);

				const youtube = env.youtube.fetch(
					new Request(request.url, {
						method: 'POST',
						body: JSON.stringify({ q, query }),
					}),
				);

				console.log((await Promise.allSettled([...google, bing, youtube])).map((elem) => elem.status));
			})(),
		);

		return new Response(null);
	},
};
