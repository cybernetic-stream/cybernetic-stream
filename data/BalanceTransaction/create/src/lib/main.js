import getOpenAI from './getOpenAI';
import { OpenAIStream } from 'ai';
import bing from './bing';
import fetchGET from './fetchGET';
import estimateAmountOfServing from './estimateAmountOfServing.mjs';

export default async function main(query){
	return new Promise(async (resolve, reject) => {
		const openai = getOpenAI('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')

		const req = {
			tools,
			model: 'gpt-4-1106-preview',
			response_format: {
				type: 'json_object',
			},
			max_tokens: 4096,
			stream: true,
			messages: [
				{
					role: 'system',
					content:'output nutritional information ** for the given portion ** as a single level JSON with keys serving_size [use the unit from the nutrition facts of the given food nothing other than the number, type number], serving_size_units [the units of the serving size number] calories [in calories], total_fat [in grams], protein [in grams], saturated_fat [in grams], trans_fat [in grams], cholesterol [in milligrams], sodium [in milligrams], total_carbohydrates [in milligrams], dietary_fiber [in grams], sugar [in grams], food_name, using the estimated seving size of the given food. Ensure the accuracy of the output JSON utilize the bing and GET requests to returned websites to refrence nutrion facts.  **** The output serving_size and associated nutrional info for the output JSON should be based on the get_serving_size function tool ***',
				},
				{
					role: 'user',
					content: query
				},
				],
		};


		const stream = OpenAIStream(await openai.chat.completions.create(req), {
			experimental_onToolCall: async ({tools}, constructMessagesWithToolContent) => {
				let toolMessages = []
				for (const tool of tools) {
					const tool_call_result = await toolbox[tool.func.name](JSON.parse(tool.func.arguments));
					toolMessages = constructMessagesWithToolContent({
						tool_call_id: tool.id,
						tool_call_result,
						function_name: tool.func.name
					});
				}
				console.log(JSON.stringify(toolMessages, null, 2))
				return openai.chat.completions.create( {...req, messages: [...req.messages, ...toolMessages]});
			}
		});

		resolve(stream)
	})
}

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
	},
	{
		type: 'function',
		function: {
			name: 'getServingSize',
			desctription: 'estimates the amount of a serving of a given food in the specified unit. Use this to determine the serving_size for the response',
			parameters: {
				type: 'object',
				required: ['foodDescription', 'requestedEstimationUnit'],
				properties: {
					foodDescription: {
						type: 'string',
						description: 'the amount and name of a food to estimate the searving size for'
					},
					requestedEstimationUnit: {
						type: 'string',
						description: 'desired output unit for the estimation to be in'
					}
				}
			}
		}
	}
]

const toolbox = {
	bing: async ({query}) => await bing(query),
	fetchGET: async ({url}) => await fetchGET(url),
	getServingSize: async ({foodDescription, requestedEstimationUnit}) => await estimateAmountOfServing(foodDescription, requestedEstimationUnit)
}
