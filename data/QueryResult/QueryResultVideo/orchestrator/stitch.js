import { spawn } from "child_process";
import fs from "fs";

export default async function stitch(results, id) {
  const segmentsFilename = `./shared/segments.txt`;
  const outputFilename = `./shared/${id}/${id}.mp4`;

  fs.writeFileSync(
    segmentsFilename,
    results.map((file) => `file '${file}'`).join("\n"),
  );

  return new Promise((resolve, reject) => {
    const ffmpegProcess = spawn("ffmpeg", [
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      segmentsFilename,
      "-c",
      "copy",
      outputFilename,
    ]);

    ffmpegProcess.on("close", () => {
      resolve(outputFilename);
    });
  });
}
