import getOpenAI from './getOpenAI';
import { OpenAIStream } from 'ai';
import bing from './bing';
import fetchGET from './fetchGET';

export default async function nutrients(query){
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
		
		let messages = [
			{
				role: 'system',
				content: 'Output a single level JSON FDA spec nutriton label for the given food (use the serving size quantity) : calories [ in grams], total_fat [in_grams], saturated_fat [in grams], trans_fat [in grams], cholesterol [in milligrams], sodium [in milligrams], total_carbs [in grams], dietary_fiber [in grams], sugars [in grams], added_sugars [in grams], protein [in grams], vitamin_d [in mcg], calcium [in milligrams], iron [in milligrams], potassium [in milligrams], serving_size. Find it with a web search and scrape the HTML to produce the JSON.'
			},
			{
				role: 'user',
				content: query
			}
		]
		
		const res = await openai.chat.completions.create({
			tools,
			model: 'gpt-4-1106-preview',
			stream: true,
			response_format: {
				type: 'json_object',
			},
			max_tokens: 4096,
			messages
		})
		
		
		const stream = OpenAIStream(res, {
			experimental_onToolCall: async ({tools}, constructMessagesToolCall) => {
				console.log(389498)
				let toolCallNewMessages = []

				for (const tool of tools){
					console.log(JSON.stringify(tool,null, 2))
					toolCallNewMessages = constructMessagesToolCall({
						function_name: tool.func.name,
						tool_call_id: tool.id,
						tool_call_result: await toolbox[tool.func.name](JSON.parse(tool.func.arguments))
					})
				}
				
				return openai.chat.completions.create({
					tools: [
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
								name: "nutritionDataFetchGET",
								description: 'makes a GET request to a given URL and parses the HTML for the requested food nutrition data if found',
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
					],
					model: 'gpt-4-1106-preview',
					stream: true,
					response_format: {
						type: 'json_object',
					},
					max_tokens: 4096,
					messages: [...messages, ...toolCallNewMessages]
				})
			}
			})
		
		
		
		resolve(stream)
	})
}

const toolbox = {
	bing: async ({query}) => bing(query),
	fetchGET: async ({url}) => fetchGET(url)
}