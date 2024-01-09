import { Redis } from '@upstash/redis/cloudflare';

export default async function constructFleetDriveStateUpdate2(obj, env) {
	return {
		fields: {
			address: {
				stringValue: await getAddress(obj.latitude, obj.longitude, env),
			},
		},
	};
}

async function getAddress(lat, long, env) {
	function formatFormattedAddress(str) {
		const upToLastComma = str.substring(0, str.lastIndexOf(','));
		const upToLastSpace = upToLastComma.substring(0, upToLastComma.lastIndexOf(' '));
		return upToLastSpace;
	}
	const redis = Redis.fromEnv(env);
	const value = await redis.get(`${lat}-${long}`);

	if (value) {
		return value;
	}

	try {
		const formatted_address = formatFormattedAddress(
			await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${env.GOOGLE_MAPS_API_KEY}`)
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
