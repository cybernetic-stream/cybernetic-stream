import { Redis } from '@upstash/redis/cloudflare';

export default {
	async fetch(request, env, ctx) {
		const place = (await request.json()).message.attributes['ce-document'].split(/[/\\]/).pop().split('pi_')[0];
		const placeURL = await Redis.fromEnv(env).get(`${place}-url`);
		const placeURLRevalidation = await fetch(`https://www.${placeURL}/api/revalidate/payment`).then((x) => x.status);
		const placeURLCacheWarm = await fetch(`https://www.${placeURL}/`).then((x) => x.status);
		console.log({
			placeURLRevalidation,
			placeURLCacheWarm,
		});
		return new Response();
	},
};
