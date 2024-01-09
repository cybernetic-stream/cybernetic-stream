import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let serviceAccount;

if (process.env.IS_DEPLOYMENT) {
  // Decode from base64 when IS_DEPLOYMENT is set
  serviceAccount = Buffer.from(process.env.BASE64_GCP_SERVICE_ACCOUNT, 'base64').toString('ascii');
} else {
  // Directly use the GCP_SERVICE_ACCOUNT variable when IS_DEPLOYMENT is not set
  serviceAccount = process.env.GCP_SERVICE_ACCOUNT;
}

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(serviceAccount))
  });
}


export const db = getFirestore();
