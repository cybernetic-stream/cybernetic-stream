import searchResults from "./searchResults.js";
import parse from "./parse.js";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import listingImages from "./listingImages.js";
import listing from "./listing.js";

let gcpServiceAccount = process.env.GCP_SERVICE_ACCOUNT;

// Check if the application is running inside a container
if (process.env.IS_CONTAINER) {
  // If so, decode the base64-encoded GCP service account string
  let buffer = Buffer.from(gcpServiceAccount, 'base64');
  gcpServiceAccount = buffer.toString('utf-8');
}

console.log(process.env.IS_CONTAINER)

initializeApp({
  credential: cert(JSON.parse(gcpServiceAccount)),
});

const db = getFirestore();

export default async function refresh(query) {
  const res = await parse(await searchResults(query));

  for (const unit of res) {
    const images = await listingImages(await listing(unit.source_id));

    if (unit.interior_color !== 'white'){
      continue;

    }

    await db
      .collection("FleetSourcing")
      .doc(unit.vin)
      .set(
        {
          ...unit,
          query,
          as_of: Timestamp.now(),
          status: "active",
          images,
        },
        {
          merge: true,
        },
      );
  }




  const found_vins = res.map((elem) => elem.vin);
  const active_query_matches = await db
    .collection("FleetSourcing")
    .where("status", "==", "active")
    .where("query", "==", query)
    .get();

  active_query_matches.forEach(async (doc) => {
    if (found_vins.includes(doc.data().vin)) {
      await db
        .collection("FleetSourcing")
        .doc(doc.id)
        .set({ status: "inactive" }, { merge: true });
    }
  });

}
