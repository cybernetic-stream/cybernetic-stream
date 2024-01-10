import Index from "@/app/_grid";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let serviceAccount;

if (process.env.IS_DEPLOYMENT) {
  // Decode from base64 when IS_DEPLOYMENT is set
  serviceAccount = Buffer.from(process.env.BASE64_GCP_SERVICE_ACCOUNT, 'base64').toString('utf-8');
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
export default async function Page() {
  const placesSnapshot = await db
    .collection("Sublicense")
    .orderBy("created", "desc")
    .orderBy("name", "asc")
    .get();
  let places = {};
  placesSnapshot.forEach((doc) => {
    const { price, value, expenses, name } = doc.data();
    places[doc.id] = { price, value, expenses, name };
  });

  return (
    <>
      <Index places={places} sublicenseInitialData={places} />
    </>
  );
}


