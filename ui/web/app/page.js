import Index from "@/app/_grid";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let serviceAccount = process.env.GCP_SERVICE_ACCOUNT;

if (process.env.IS_DEPLOYMENT) {
  serviceAccount = Buffer.from(serviceAccount, 'base64').toString('ascii');
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


