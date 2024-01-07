import searchResults from "./searchResults.js";
import parse from "./parse.js";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import listingImages from "./listingImages.js";
import listing from "./listing.js";

const credential = cert(JSON.parse(process.env.GCP_SERVICE_ACCOUNT))

initializeApp({
  credential,
});

const db = getFirestore();

export default async function refresh(query) {
  const res = await parse(await searchResults(query));

  for (const unit of res) {
    const images = await listingImages(await listing(unit.source_id));

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
  const batchSize = 10;
  for (let i = 0; i < found_vins.length; i += batchSize) {
    const batch = found_vins.slice(i, i + batchSize);
    const batchQuery = db
      .collection("FleetSourcing")
      .where("status", "==", "active")
      .where('query', '==', query)
      .where("vin", "not-in", batch);

    const querySnapshot = await batchQuery.get();

    querySnapshot.forEach(async (doc) => {
      await db
        .collection("FleetSourcing")
        .doc(doc.id)
        .update({ status: "inactive" }, { merge: true });
    });
    
  }
}
