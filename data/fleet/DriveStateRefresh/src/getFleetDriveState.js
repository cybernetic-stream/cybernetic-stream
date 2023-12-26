export default async function getFleetDriveState(id, accessToken) {
	return await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/vehicle_data?endpoints=location_data`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	}).then(async (res) => {
		if (res.status == 408) {
			await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/wake_up`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return await getFleetDriveState(id);
		} else {
			return (await res.json()).response.drive_state;
		}
	});
}
