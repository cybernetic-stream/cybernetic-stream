import OpenAI from 'openai';
let client;

export default function getOpenAI(key){
	if (typeof client === 'undefined'){
		client = new OpenAI({apiKey: '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'})
		return client
	} else return client 
}
