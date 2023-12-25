import { spawn } from "child_process";
import db from "./db.js";
import { Timestamp } from "firebase-admin/firestore";
let lastUpdate = 0;

export default async function mp4({ start, end, filename, videoId, index }) {
  const mp4Filename = `${filename}-${start}-${end}.mp4`;
  const docRef = db(videoId).collection("EncodeProgress").doc(String(index));
  await docRef.set(
    {
      start,
      end,
      filename,
      pod: typeof process.env.pod === "undefined" ? null : process.env.pod,
      node: typeof process.env.node === "undefined" ? null : process.env.node,
    },
    { merge: true },
  );

  return new Promise((resolve, reject) => {
    const p = spawn("ffmpeg", [
      "-i",
      filename,
      "-ss",
      start,
      "-t",
      end,
      "-y",
      mp4Filename,
    ]);

    p.stderr.on("data", (data) => {
      handleStdoutData(data.toString(), docRef);
    });

    p.on("close", (code) => {
      resolve(mp4Filename);
    });
  });
}

async function handleStdoutData(dataString, docRef) {
  const tokens = dataString.replaceAll("=", " ").trim().split(/\s+/);

  if (tokens.includes("frame") && Date.now() - lastUpdate > 1000) {
    const update = {};

    try {
      if (!isNaN(parseInt(tokens[tokens.indexOf("frame") + 1]))) {
        update.frame = parseInt(tokens[tokens.indexOf("frame") + 1]);
      }
    } catch (e) {}

    try {
      if (!isNaN(parseInt(tokens[tokens.indexOf("fps") + 1]))) {
        update.fps = parseInt(tokens[tokens.indexOf("fps") + 1]);
      }
    } catch (e) {}

    try {
      if (
        !isNaN(parseFloat(tokens[tokens.indexOf("size") + 1].replace("kB", "")))
      ) {
        update.size = parseFloat(
          tokens[tokens.indexOf("size") + 1].replace("kB", ""),
        );
      }
    } catch (e) {}

    try {
      const timeIndex = tokens.indexOf("time") + 1;
      const timeString = tokens[timeIndex];
      if (timeString && timeString.indexOf(":") === 2) {
        const parts = timeString.split(":");
        if (parts.length === 3) {
          update.time =
            parseInt(parts[0], 10) * 3600 +
            parseInt(parts[1], 10) * 60 +
            parseInt(parts[2], 10);
        }
      }
    } catch (e) {}

    try {
      if (
        !isNaN(
          parseFloat(
            tokens[tokens.indexOf("bitrate") + 1].replace("kbits/s", ""),
          ),
        )
      ) {
        update.bitrate = parseFloat(
          tokens[tokens.indexOf("bitrate") + 1].replace("kbits/s", ""),
        );
      }
    } catch (e) {}

    try {
      const speedIndex = tokens.indexOf("speed") + 1;
      const speed = tokens[speedIndex];
      if (speed && speed.endsWith("x")) {
        update.speed = speed.replace("x", "");
      }
    } catch (e) {}

    if (Object.keys(update).length > 0) {
      await docRef.set({ ...update, as_of: Timestamp.now() }, { merge: true });
      lastUpdate = Date.now();
    }
  }
}
