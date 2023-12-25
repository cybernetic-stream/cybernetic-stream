import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: cert(JSON.parse(process.env.GCP_SERVICE_ACCOUNT)),
});

export default function db(id) {
  return getFirestore().collection("Video").doc(id);
}
