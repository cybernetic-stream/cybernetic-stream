import bing from './lib/bing';
import fetchGET from './lib/fetchGET';

import estimateAmountOfServing from './lib/estimateAmountOfServing.mjs';



export default {
	async fetch(request, env, ctx) {

		const url = new URL(request.url)

		if(url.pathname === '/nutrients'){
			const {query}  = await request.json()
			return new Response(49)
//			return new StreamingTextResponse(await nutrients(query))
		} else if (url.pathname === '/bing'){
			const {query} = await request.json()
			return new Response(await bing(query))
		} else if (url.pathname === '/fetchGET'){
			const {url} = await request.json()
			return new Response(await fetchGET(url))
		} else if (url.pathname === '/estimateAmountOfServing'){
			const {foodDescription, requestedEstimationUnit} = await request.json()
			return new Response(await estimateAmountOfServing(foodDescription, requestedEstimationUnit))
		} else {
			return new Response(null, {status: 404})
		}

	}
}
