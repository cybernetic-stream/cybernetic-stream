export default {
	async scheduled(event, env, ctx) {
		let resp = await fetch('https://collection-http-trigger-2aqyt6m5mq-wl.a.run.app', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				url: 'https://fleet-token-refresh.cyberneticstream.com',
				passthroughId: true,
				collection: 'FleetDriveState',
			}),
		});
		let wasSuccessful = resp.ok ? 'success' : 'fail';
		console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
	},
};
