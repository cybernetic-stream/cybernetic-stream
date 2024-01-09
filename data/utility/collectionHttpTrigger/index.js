import express from "express";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = express();

let gcpServiceAccount = process.env.GCP_SERVICE_ACCOUNT;
if (process.env.IS_CONTAINER) {
  let buffer = Buffer.from(gcpServiceAccount, 'base64');
  gcpServiceAccount = buffer.toString('utf-8');
}
initializeApp({
  credential: cert(JSON.parse(gcpServiceAccount)),
});

const db = getFirestore();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
app.post("/", async (req, res) => {
  try {
    const requests = [];
    const { collection, passthroughKeys, url, passthroughId } = req.body;
    const collectionSnapshot = await db.collection(collection).get();
    let data;
    for (const doc of collectionSnapshot.docs) {
      data = {};
      for (let elem in passthroughKeys) {
        data[passthroughKeys[elem]] = doc.data()[passthroughKeys[elem]];
      }
      if (passthroughId) {
        data.id = doc.id;
      }
      requests.push(
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => response.status),
      );
    }
    const responses = await Promise.all(requests);
    res.json({
      message: "done",
      responses,
      body: req.body,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send();
  }
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
