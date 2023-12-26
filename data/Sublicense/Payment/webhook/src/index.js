export default {
	async fetch(request, env) {
		const body = await request.json();
		if (body.type.includes('payment_intent')) {
			if (typeof body.data.object.metadata.place === 'undefined' || typeof body.data.object.metadata.name === 'undefined') {
				return new Response(null, { status: 202 });
			}
			const document = {
				fields: {
					amount: {
						integerValue: body.data.object.amount,
					},
					client_secret: {
						stringValue: body.data.object.client_secret,
					},
					created: {
						timestampValue: new Date(body.data.object.created * 1000).toISOString(),
					},
					name: {
						stringValue: body.data.object.metadata.name,
					},
					place: {
						stringValue: body.data.object.metadata.place,
					},
					statement_descriptor: body.data.object.statement_descriptor
						? {
								stringValue: body.data.object.statement_descriptor,
						  }
						: {
								nullValue: body.data.object.statement_descriptor,
						  },
					status: {
						stringValue: body.data.object.status,
					},
				},
			};
			await setDoc('payment', body.data.object.metadata.place + body.data.object.id, document);
		}
		return new Response();
	},
};

async function setDoc(collection, id, document) {
	return await fetch(`https://firestore.googleapis.com/v1/projects/projectname-o/databases/(default)/documents/${collection}/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(document),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((x) => x.json());
}
