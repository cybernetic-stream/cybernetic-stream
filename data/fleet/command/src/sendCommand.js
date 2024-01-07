export default async function sendCommand(id, command, POSTBody, accessToken) {
	const response = await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/command/${command}`, {
		method: 'POST',
		body: JSON.stringify(POSTBody),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (response.status === 408) {
		await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/wake_up`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`, // Assuming accessToken is still valid
			},
		});
		return sendCommand(id, command, POSTBody, accessToken); // Recursively call with return
	}

	return await response.json();
}
