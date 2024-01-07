import { Redis } from '@upstash/redis/cloudflare';
import constructFleetDriveStateUpdate2 from './constructFleetDriveStateUpdate2';
import constructFleetDriveStateUpdate1 from './constructFleetDriveStateUpdate1';
import getFleetDriveState from './getFleetDriveState';

async function updateFirestoreDocument(id, updatePath, body) {
	const url = `https://firestore.googleapis.com/v1/projects/projectid-x/databases/(default)/documents/FleetDriveState/${id}?${updatePath}`;
	const headers = { 'Content-Type': 'application/json' };
	return fetch(url, { method: 'PATCH', body: JSON.stringify(body), headers });
}

export default {
	async fetch(request, env) {
		const redis = Redis.fromEnv(env);
		const { id } = await request.json();
		const lastUpdateKey = `last_update-${id}`;
		const last_update = await redis.get(lastUpdateKey);

		const headers = new Headers({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		});

		if (parseInt(last_update) + 4000 >= Date.now()) {
			return new Response(null, { status: 202, headers });
		} else {
			await redis.set(lastUpdateKey, Date.now());
		}

		const accessToken = await redis.get(`access_token-${id}`);
		const fleetDriveState = await getFleetDriveState(id, accessToken);

		const update1Path = `updateMask.fieldPaths=latitude&updateMask.fieldPaths=longitude&updateMask.fieldPaths=gps_as_of&updateMask.fieldPaths=shift_state&updateMask.fieldPaths=speed&updateMask.fieldPaths=heading`;
		const update2Path = `updateMask.fieldPaths=address`;

		const update1Promise = updateFirestoreDocument(id, update1Path, await constructFleetDriveStateUpdate1(fleetDriveState));
		const update2Promise = updateFirestoreDocument(id, update2Path, await constructFleetDriveStateUpdate2(fleetDriveState, env));

		await Promise.allSettled([update1Promise, update2Promise]);

		return new Response(null, { headers });
	},
};
