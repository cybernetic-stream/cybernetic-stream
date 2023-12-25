export default {
	async scheduled(event, env, ctx) {
		let resp = await fetch('https://data-collection-fleet-sourcing-orchestrator-2aqyt6m5mq-wl.a.run.app', {
			method: 'POST',
		});
		let wasSuccessful = resp.ok ? 'success' : 'fail';
		console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
	},
};
