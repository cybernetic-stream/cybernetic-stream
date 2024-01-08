import express from "express";
import parse from "./lib/parse.js";
import searchResults from "./lib/searchResults.js";
import listing from "./lib/listing.js";
import listingImages from "./lib/listingImages.js";
import refresh from "./lib/refresh.js";

const app = express();
app.use(express.json());

app.post("/search-results", async (req, res) => {
  // ?page=results&make=tesla&model=model+3&trim=model+3+-+performance&year=2021-2024&zipcode=94577&sort=endTime&order=asc
  const { query } = req.body;
  const data = await searchResults(query);
  res.send(data);
});

app.post("/parse", async (req, res) => {
  // https://fleet-sourcing.cyberneticstream.com/adesa/search-results/page=results&make=tesla&model=model+3&trim=model+3+-+performance&year=2021-2024&zipcode=94577&sort=endTime&order=asc/1704586383817.html
  const { url } = req.body;
  const data = await parse(url);
  res.send(data);
});

app.post("/listing", async (req, res) => {
  //921704627 expires
  const { id } = req.body;
  const data = await listing(id);
  res.send(data);
});

app.post("/listing-images", async (req, res) => {
  //https://fleet-sourcing.cyberneticstream.com/adesa/listing/921704627/1704644244890.html
  const { url } = req.body;
  const data = await listingImages(url);
  res.send(data);
});

app.post("/refresh", async (req, res) => {
  // ?page=results&make=tesla&model=model+3&trim=model+3+-+performance&year=2021-2024&zipcode=94577&sort=endTime&order=asc
  const { query } = req.body;
  await refresh(query);
  res.send();
});

app.post("/", async (req, res) => {
  // ?page=results&make=tesla&model=model+3&trim=model+3+-+performance&year=2021-2024&zipcode=94577&sort=endTime&order=asc
  const { query } = req.body;
  await refresh(query);
  res.send();
});

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
