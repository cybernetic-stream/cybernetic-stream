import { Redis } from '@upstash/redis/cloudflare';

export default {
	async fetch(request, env) {
		const redis = Redis.fromEnv(env);

		try {
			const { id } = await request.json();
			const response = await fetch('https://auth.tesla.com/oauth2/v3/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					grant_type: 'refresh_token',
					client_id: '814be693825f-4b71-b895-b21f77bb23b8',
					client_secret: env.TESLA_CLIENT_SECRET,
					scope: 'openid vehicle_device_data vehicle_cmds vehicle_charging_cmds',
					audience: 'https://fleet-api.prd.na.vn.cloud.tesla.com',
					refresh_token: await redis.get(`refresh_token-${id}`),
				}),
			}).then((res) => res.json());

			if (typeof response.access_token === 'undefined') {
				throw new Error();
			}

			await redis.mset({
				[`access_token-${id}`]: response.access_token,
				[`refresh_token-${id}`]: response.refresh_token,
			});

			return new Response(null, { status: 200 });
		} catch (e) {
			console.error(e);
			return new Response(null, { status: 400 });
		}
	},
};

//