import express from "express";
//import { initializeApp, cert } from "firebase-admin/app";
//import { getFirestore, Timestamp } from "firebase-admin/firestore";
//import handleQuery from "./handlers/query.js";

//initializeApp({
//  credential: cert(JSON.parse(process.env.GCP_SERVICE_ACCOUNT)),
//});
//const db = getFirestore();

const app = express();
//app.use(express.json());
//app.get("/query", async (req, res) => await handleQuery(req, res));
//app.get("/listing", async (req, res) => await handleListing(req, res));
//app.get(
//  "/lising-images",
//  async (req, res) => await handleListingImages(req, res),
//);
//app.post("parse", async (req, res) => await handleParse(req, res));
//app.get("/", async (req, res) => await handleRoot(req, res));

app.get('/', async (req, res) => {

  res.text('kk').send()
})

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});


///