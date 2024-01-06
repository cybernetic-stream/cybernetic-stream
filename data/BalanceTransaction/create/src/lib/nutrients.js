import getOpenAI from './getOpenAI';
import {OpenAIStream} from 'ai'

export default function nutrients(query){
	return new Promise(async (resolve, reject) => {
		const openai = getOpenAI()

		const tools = [
			{
				type: 'function',
				function: {
					name: 'bing',
					descripton: 'preform a search engine query with Bing',
					parameters: {
						type: 'object',
						required: ['query'],
						properties: {
							query: {
								type: 'string',
								description: 'your query'
							}
						}
					}
				}
			},
			{
				type: "function",
				function: {
					name: "fetchGET",
					description: 'makes a GET request to a given URL',
					parameters: {
						type: 'object',
						required: ['url'],
						properties: {
							url : {
								type: 'string',
								description: 'the URL to make the GET request for'
							}
						}
					}
				}
			}
		]

		const req = {
			tools,
			model: 'gpt-4-1106-preview',
			stream: true,
			response_format: {
				type: 'json_object',
			},
			max_tokens: 4096,
			messages: [
				{
					role: 'system',
					content: 'Output a single level JSON FDA spec nutriton label for the given food (use the serving size quantity) : calories [ in grams], total_fat [in_grams], saturated_fat [in grams], trans_fat [in grams], cholesterol [in milligrams], sodium [in milligrams], total_carbs [in grams], dietary_fiber [in grams], sugars [in grams], added_sugars [in grams], protein [in grams], vitamin_d [in mcg], calcium [in milligrams], iron [in milligrams], potassium [in milligrams], serving_size. Find it with a web search and scrape the HTML to produce the JSON '
				},
				{
					role: 'user',
					content: '10 fuji apples'
				}
			]
		}
		
		const stream = OpenAIStream(await openai.chat.completions.create(req))
		
		resolve(stream)
		
	})
}

f
