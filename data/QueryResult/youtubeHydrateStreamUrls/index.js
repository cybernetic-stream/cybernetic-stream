import { spawn } from "child_process";
import express from "express";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Redis } from "@upstash/redis";

const redis = new Redis.fromEnv();
const app = express();
const db = getFirestore();
initializeApp({
  credential: cert(JSON.stringify(process.env.GCP_SERVICE_ACCOUNT)),
});
app.use(express.json());

async function canSkipJob(videoId) {
  return !!(await redis.get(videoId));
}

app.post("/", async (req, res) => {
  const { videoId, docId } = JSON.parse(
    Buffer.from(req.body.message.data, "base64").toString("utf-8"),
  );

  console.log(videoId, docId);

  if (await canSkipJob(videoId)) {
    console.log("can skip job");
    return res.status(202).send();
  }

  const streamURLS = Object.values(await getStreamURLS(videoId));

  if (await canSkipJob(videoId)) {
    console.log("can skip job");
    return res.status(202).send();
  }

  if (streamURLS.length === 0) {
    res.status(500).send();
    return;
  }

  await db.collection("QueryResultVideo").doc(docId).set(
    {
      stream_urls: streamURLS,
    },
    { merge: true },
  );

  if (await canSkipJob(videoId)) {
    console.log("can skip job");
    return res.status(202).send();
  }

  res.send();
});

async function getStreamURLS(id) {
  const returnObject = {};
  return new Promise((resolve, reject) => {
    const YT_DLP_ARGS = [
      "-f",
      "bestvideo[ext=webm]+bestaudio[ext=webm]/best[ext=webm]",
      "-g",
    ];
    const URL_PREFIX = "https://www.youtube.com/watch?v=";

    const p = spawn("yt-dlp", [...YT_DLP_ARGS, `${URL_PREFIX}${id}`]);

    p.stdout.on("data", async (data) => {
      const tokens = data.toString().trim().split(/\s+/);
      tokens.forEach((elem) => {
        const url = new URL(elem);
        returnObject[url.searchParams.get("mime")] = url.href;
      });
    });

    p.stdout.on("close", () => {
      console.log(returnObject);
      resolve(returnObject);
    });
  });
}

app.listen(process.env.PORT, () => {
  console.log("listening in on " + process.env.PORT);
});
