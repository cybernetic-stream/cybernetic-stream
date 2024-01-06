import OpenAI from 'openai';
let client;

export default function getOpenAI(key){
	if (typeof client === 'undefined'){
		client = new OpenAI({apiKey: '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'})
		return client
	} else return client 
}
