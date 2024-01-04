import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
	apiKey: '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',
});

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const queryParams = new URLSearchParams(url.search);
		const q = queryParams.get('q');
		console.log(q)

		const tools = [
			{
				type: 'function',
				name: 'get_usda_food_data',
				function: {
					name: 'get_usda_food_data',
					description:
						'Search the USDA food data database for nutritional information. The dataType parameter is required to specify the category of the food item for a more accurate search result. The dataType values should be provided as a comma-separated list.',
					parameters: {
						type: 'object',
						required: ['query', 'dataType'],
						properties: {
							query: {
								type: 'string',
								description: 'The search query for the food item (e.g., "banana", "apple").',
							},
							dataType: {
								type: 'array',
								items: {
									type: 'string',
								},
								description:
									'An array of data types to filter the search, provided as a comma-separated list. Each type serves a specific purpose: \
                          "Branded" - For commercially available products with specific brand names. \
                          "Foundation" - Basic foods and raw ingredients, ideal for generic, non-branded food items. \
                          "Survey (FNDDS)" - Foods as consumed in surveys, including mixed dishes. \
                          "SR Legacy" - Historical data from the USDA’s National Nutrient Database. \
                          Example format: "Foundation,Survey (FNDDS),SR Legacy"',
								example: 'Foundation,Survey (FNDDS),SR Legacy',
							},
							pageSize: {
								type: 'integer',
								description: 'The maximum number of results to return per page. max is 3',
								example: 20,
							},
							pageNumber: {
								type: 'integer',
								description: 'The page number to retrieve in the result set. start at 1',
								example: 1,
							},
						},
					},
				},
			},
		];

		const openAIRequest = {
			model: 'gpt-4-1106-preview',
			response_format: {
				type: 'json_object',
			},
			max_tokens: 4096,
			stream: true,
			messages: [
				{
					role: 'system',
					content:'output the nutritional information of the given food for the given quantity specified in JSON no nested keys, signgle level use the same keys as on a nutrition label',
				},
				{
					role: 'user',
					content: q,
				},
			],
		};

		const stream = OpenAIStream(await openai.chat.completions.create(openAIRequest), {

		});
		return new StreamingTextResponse(stream);
	},
};

async function getUSDAFoodData({ query, dataType, pageSize = 50, pageNumber = 1 }) {
	
	const apiKey = '4OxYNVD7LCPuyrKzshJ1BJ2ulgSkdyoJSzFdeERL';
	console.log(query);
	console.log(dataType);

	const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&dataType=${encodeURIComponent(
		dataType,
	)}&pageSize=${encodeURIComponent(pageSize)}&pageNumber=${encodeURIComponent(pageNumber)}&api_key=${apiKey}`;

	try {
		const response = await fetch(url);
		const usdaFoodData = (await response.json()).foods;
		console.log(JSON.stringify(usdaFoodData));
		return usdaFoodData;
	} catch (error) {
		console.error('Error fetching USDA Food Data:', error);
		throw error;
	}
}
