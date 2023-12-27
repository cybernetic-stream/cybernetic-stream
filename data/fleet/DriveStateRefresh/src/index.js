import { Redis } from '@upstash/redis/cloudflare';
import constructFleetDriveStateUpdate2 from './constructFleetDriveStateUpdate2';
import constructFleetDriveStateUpdate1 from './constructFleetDriveStateUpdate1';
import getFleetDriveState from './getFleetDriveState';

export default {
	async fetch(request, env) {
		const redis = Redis.fromEnv(env);
		const { id } = await request.json();
		const last_update = await redis.get(`last_update-${id}`);
		const headers = new Headers({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		});

		if (parseInt(last_update) + 4000 >= Date.now()) {
			return new Response(null, {
				status: 202,
				headers,
			});
		}
		await redis.set(`last_update-${id}`, new Date().getTime());

		const fleetDriveState = await getFleetDriveState(id, await redis.get(`access_token-${id}`));
		
		await Promise.allSettled([
			await fetch(
				`https://firestore.googleapis.com/v1/projects/projectname-o/databases/(default)/documents/FleetDriveState/${id}?` +
					`updateMask.fieldPaths=latitude&` +
					`updateMask.fieldPaths=longitude&` +
					`updateMask.fieldPaths=gps_as_of&` +
					`updateMask.fieldPaths=shift_state&` +
					`updateMask.fieldPaths=speed&` +
					`updateMask.fieldPaths=heading`,
				{
					method: 'PATCH',
					body: JSON.stringify(constructFleetDriveStateUpdate1(fleetDriveState)),
					headers: {
						'Content-Type': 'application/json',
					},
				},
			).then(async () => {
				await redis.set(`last_update-${id}`, driveState.gps_as_of * 1000);
			}),

			fetch(
				`https://firestore.googleapis.com/v1/projects/projectname-o/databases/(default)/documents/FleetDriveState/${id}?updateMask.fieldPaths=address`,
				{
					method: 'PATCH',
					body: JSON.stringify(await constructFleetDriveStateUpdate2(obj, redis)),
					headers: {
						'Content-Type': 'application/json',
					},
				},
			),
		]);

		return new Response(null, {
			headers,
		});
	},
};

