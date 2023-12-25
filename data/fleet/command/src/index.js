import { Redis } from '@upstash/redis/cloudflare';

export default {
	async fetch(request, env) {
		const redis = Redis.fromEnv(env);
		const url = new URL(request.url);
		const id = url.searchParams.get('id');
		const command = url.searchParams.get('command');
		console.log(command);
		try {
			let response = await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/command/${command}`, {
				method: 'POST',
				body: JSON.stringify(await request.json()),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await redis.get(`access_token-${id}`)}`,
				},
			});

			if (response.status === 408) {
				await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/wake_up`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${await redis.get(`access_token-${id}`)}`,
					},
				});
				response = await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/command/${command}`, {
					method: 'POST',
					body: JSON.stringify(await request.json()),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${await redis.get(`access_token-${id}`)}`,
					},
				});
			}

			const headers = new Headers({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			});

			return new Response(JSON.stringify(await response.json()), {
				headers: headers,
			});
		} catch {
			return new Response('error; ensure id and command are in query, and a least a JSON body', { status: 400 });
		}
	},
};
