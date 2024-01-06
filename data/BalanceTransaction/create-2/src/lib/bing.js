export default async function bing(query){
	return new Promise( async (resolve, reject) => {
		
		const result = await fetch(
			`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}&safeSearch=Off&responseFilter=webpages`,
			{
				headers: {
					'Ocp-Apim-Subscription-Key': '887f4a510f404b0bbb5aa7398a4cf816',
				},
			},
			).then((res) => res.json());
		console.log(JSON.stringify(result));
		const results = result.webPages.value;
		resolve(JSON.stringify(results, null, 2))
	})
}

