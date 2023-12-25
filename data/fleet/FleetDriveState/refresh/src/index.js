import { Redis } from '@upstash/redis/cloudflare';

export default {
	async fetch(request, env) {
		const { id } = await request.json();
		const redis = Redis.fromEnv(env);
		const last_update = await redis.get(`last_update-${id}`);

		const headers = new Headers({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		});

		if (parseInt(last_update) + 4000 >= Date.now()) {
			console.log('Sending 202 response');
			return new Response(null, {
				status: 202,
				headers,
			});
		} else {
			await redis.set(`last_update-${id}`, new Date().getTime());
		}

		try {
			let apiResponse = await fetch(
				`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/vehicle_data?endpoints=location_data`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${await redis.get(`access_token-${id}`)}`,
					},
				},
			);

			console.log(apiResponse.status);
			if (apiResponse.status === 408) {
				await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/wake_up`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${await redis.get(`access_token-${id}`)}`,
					},
				});

				apiResponse = await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/vehicle_data?endpoints=location_data`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${await redis.get(`access_token-${id}`)}`,
					},
				});
			}

			const driveState = (await apiResponse.json()).response.drive_state;

			const driveStateUpdate = await fetch(
				`https://firestore.googleapis.com/v1/projects/projectname-o/databases/(default)/documents/FleetDriveState/${id}?` +
					`updateMask.fieldPaths=latitude&` +
					`updateMask.fieldPaths=longitude&` +
					`updateMask.fieldPaths=gps_as_of&` +
					`updateMask.fieldPaths=shift_state&` +
					`updateMask.fieldPaths=speed&` +
					`updateMask.fieldPaths=heading`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						fields: {
							latitude: {
								doubleValue: driveState.latitude,
							},
							longitude: {
								doubleValue: driveState.longitude,
							},
							gps_as_of: {
								integerValue: Math.round(Date.now() / 1000),
							},
							shift_state: driveState.shift_state
								? {
										stringValue: driveState.shift_state,
								  }
								: {
										nullValue: null,
								  },
							speed: driveState.speed
								? {
										integerValue: driveState.speed,
								  }
								: {
										nullValue: null,
								  },
							heading: {
								integerValue: driveState.heading,
							},
						},
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			if (driveStateUpdate.status !== 200) {
				const responseText = await driveStateUpdate.text(); // Get the response text
				console.error(`Error with driveStateUpdate. Status: ${driveStateUpdate.status}, Response: ${responseText}`);
				throw new Error(`driveStateUpdate failed with status ${driveStateUpdate.status}`);
			}

			await redis.set(`last_update-${id}`, driveState.gps_as_of * 1000);

			const driveStateUpdate2 = await fetch(
				`https://firestore.googleapis.com/v1/projects/projectname-o/databases/(default)/documents/FleetDriveState/${id}?updateMask.fieldPaths=address`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						fields: {
							address: {
								stringValue: await getAddress(driveState.latitude, driveState.longitude, redis, env.GOOGLE_API_KEY),
							},
						},
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			return new Response(null, {
				status: 200,
				headers,
			});
		} catch (e) {
			console.log(e);
			return new Response(null, {
				status: 400,
				headers,
			});
		}
	},
};

async function fetchDriveState(id, access_token) {
	return await fetch(`https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles/${id}/vehicle_data?endpoints=location_data`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${access_token}`,
		},
	}).then((x) => x.json());
}

async function getAddress(lat, long, redis, google_api_key) {
	function formatFormattedAddress(str) {
		const upToLastComma = str.substring(0, str.lastIndexOf(','));
		const upToLastSpace = upToLastComma.substring(0, upToLastComma.lastIndexOf(' '));
		return upToLastSpace;
	}

	const value = await redis.get(`${lat}-${long}`);

	if (value) {
		return value;
	}

	try {
		const formatted_address = formatFormattedAddress(
			await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${google_api_key}`)
				.then((x) => x.json())
				.then((x) => x.results[0].formatted_address),
		);
		await redis.set(`${lat}-${long}`, formatted_address, {
			ex: 86400,
		});
		return formatted_address;
	} catch (e) {
		console.log(e);
		return '';
	}
}
