import { spawn } from "child_process";
import db from "./db.js";
import { FieldValue } from "firebase-admin/firestore";
import { dirname, resolve as pathResolve } from "path";
import { fileURLToPath } from "url";

const YT_DLP_ARGS = ["-f", "bv+ba/b", "-k", "-o"];
const URL_PREFIX = "https://www.youtube.com/watch?v=";
let relativeFilename;
let lastUpdate = 0;
const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function download(id) {
  return new Promise((resolve, reject) => {
    const docRef = db(id);
    const outputPath = `./shared/${docRef.id}/download.%(ext)s`;

    const p = spawn("yt-dlp", [
      ...YT_DLP_ARGS,
      outputPath,
      `${URL_PREFIX}${docRef.id}`,
    ]);

    p.stdout.on("data", async (data) => {
      await handleStdoutData(data.toString(), docRef);
    });

    p.stdout.on("close", () => {
      resolve(
        pathResolve(
          __dirname,
          relativeFilename.replaceAll("./", "").replaceAll('"', ""),
        ),
      );
    });
  });
}

async function handleStdoutData(dataString, docRef) {
  const tokens = dataString.trim().split(/\s+/);

  for (const token of tokens) {
    if (token.includes("./shared/")) {
      relativeFilename = token;
    }
  }

  if (tokens[0].includes("download") && Date.now() - lastUpdate > 250) {
    const update = {};

    try {
      if (!isNaN(parseFloat(tokens[1].replace("%", "")))) {
        update.downloaded_percent = parseFloat(tokens[1].replace("%", ""));
      }
    } catch (e) {
      console.log("value skipping, undefined");
    }

    try {
      if (!isNaN(parseFloat(tokens[4].replace("MiB", "")))) {
        update.downloaded_bytes = parseFloat(tokens[4].replace("MiB", ""));
      }
    } catch (e) {
      console.log("value skipping, undefined");
    }

    try {
      if (!isNaN(tokens[6].replace("MiB/s", ""))) {
        update.download_bytes_per_second = parseFloat(
          tokens[6].replace("MiB/s", ""),
        );
      } else {
        update.download_bytes_per_second = FieldValue.delete();
      }
    } catch (e) {
      console.log("value skipping, undefined");
    }

    if (Object.keys(update).length !== 0) {
      await docRef.set({ update }, { merge: true });
      lastUpdate = Date.now();
    }
  }
}
