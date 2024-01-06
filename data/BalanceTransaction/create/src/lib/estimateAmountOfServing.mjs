
import getOpenAI from './getOpenAI.js';

export default async function estimateAmountOfServing(foodDescription, requestedEstimationUnit){
	return new Promise( async (resolve, reject) => {
		const openai = await getOpenAI()

		const req  = {
			'model': "gpt-4-1106-preview",
			messages: [
				{
					role: 'system',
					content: 'estimate the serving size of food provided. Output the serving size of the food ** only **, as a number in string form no units',
				},
				{
					role: 'user',
					content: foodDescription + ' in units of' + requestedEstimationUnit
				}
			]
		}
		
		resolve((await openai.chat.completions.create(req)).choices[0].message.content)

	})
}
