import express from "express";
import download from "./download.js";
import getSegments from "./getSegments.js";
import encodeSegments from "./encodeSegments.js";
import * as fs from "fs";
import { resolve } from "path";
import stitch from "./stitch.js";
import upload from "./upload.js";

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  const { id, numSegments } = req.body;
  let downloadFilename;
  let segments;
  let mp4Segments;
  let mp4Filename;

  try {
    downloadFilename = await download(id);
    console.log("file downloaded ", downloadFilename);
  } catch (e) {
    console.log("download error ", e);
    return res.status(500).send("Error during file download");
  }

  try {
    segments = await getSegments(
      downloadFilename,
      typeof numSegments === "undefined" ? 400000000 : numSegments,
    );
    console.log("getSegments succeeded", segments);
  } catch (e) {
    console.log("getSegments error ", e);
    return res.status(500).send("Error during segment processing");
  }

  try {
    mp4Segments = await encodeSegments(segments, downloadFilename, id);
    console.log("All segments processed:", mp4Segments);
  } catch (error) {
    console.error("Error processing segments:", error);
    return res.status(500).send("Error processing segments");
  }

  try {
    mp4Filename = await stitch(mp4Segments, id);
    console.log("stitch done, output ", mp4Filename);
  } catch (error) {
    console.error("Error stitching segments ", mp4Segments, error);
    return res.status(500).send("Error stitching segments");
  }

  try {
    await upload(mp4Filename);
    console.log("uploaded mp4 to storage");
  } catch (error) {
    console.log("Error uploading mp4 to storage", error);
    return res.status(500).send("Error uploading file to storage");
  }

  res.send();

  try {
    fs.rmSync(resolve(`./shared/${id}`), { recursive: true, force: true });
  } catch (error) {
    console.error(`Error deleting directory: ${error.message}`);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`--xxlistening at port ${process.env.PORT}`);
});
