import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let serviceAccount = process.env.GCP_SERVICE_ACCOUNT;

if (process.env.IS_DEPLOYMENT) {
  serviceAccount = Buffer.from(serviceAccount, 'base64').toString('ascii');
}

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(serviceAccount)),
  });
}

export const db = getFirestore();
