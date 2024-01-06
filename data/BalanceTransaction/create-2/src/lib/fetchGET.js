import getOpenAI from './getOpenAI';

export default async function fetchGET(url, foodName){
	
	const openai = getOpenAI()
	
	const res = openai.chat.completions.create({
		model: 'gpt-4-1106-preview',
		stream: true,
		response_format: {
			type: 'json_object'
		},
		max_tokens: 4096,
		messages: {
			role: 'system',
			content: 'output A JSON '
		}
	})
	
	console.log("FETCHNG")
	return await fetch(url).then(res => res.text())
}