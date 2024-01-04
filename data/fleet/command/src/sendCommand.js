export default async function sendCommand(id, command, POSTBody, accessToken) {
	return await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/command/${command}`, {
		method: 'POST',
		body: JSON.stringify(POSTBody),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	}).then(async (res) => {
		if (res.status === 408) {
			await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/wake_up`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${await redis.get(`access_token-${id}`)}`,
				},
			});
			await sendCommand(id, command, await request.json(), accessToken);
		}
	});
}
