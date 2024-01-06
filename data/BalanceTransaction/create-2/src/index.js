/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { StreamingTextResponse } from 'ai';
import nutrients from './lib/nutrients';

export default {
	async fetch(request, env, ctx) {
		
		const url = new URL(request.url)

		if(url.pathname === '/nutrients'){
			const {query} = await request.json()
			return new StreamingTextResponse(await nutrients(query))
		}
		
		
		
		
		
		
		return new Response('Hello World!');
	},
};
