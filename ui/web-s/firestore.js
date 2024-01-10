import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let serviceAccount;

if (typeof process.env.BASE64_GCP_SERVICE_ACCOUNT !== 'undefined') {
  serviceAccount = Buffer.from(process.env.BASE64_GCP_SERVICE_ACCOUNT, 'base64').toString('utf-8');
} else {
  serviceAccount = process.env.GCP_SERVICE_ACCOUNT;
}

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(serviceAccount))
  });
}



export const db = getFirestore();
