/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const logger = require('firebase-functions/logger');
const { PubSub } = require('@google-cloud/pubsub');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');

const pubsub = new PubSub();

exports.main = onDocumentCreated({ document: `QueryResultVideo/{docId}`, region: 'us-west2' }, async (event) => {
	const videoId = event.data.data().id;
	const docId = event.data.id;

	const update = {
		videoId,
		docId,
	};

	console.log(update);

	const dataBuffer = Buffer.from(JSON.stringify(update));

	const messageId = await pubsub.topic('query-result-youtube-hydrate-stream-urls').publishMessage({ data: dataBuffer });

	logger.log('done' + messageId);
});
