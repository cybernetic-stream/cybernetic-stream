import { spawn } from "child_process";

export default async function getSegments(filename, numSegments = 400000000) {
  let metadata;

  try {
    metadata = await getMetadata(filename);
    console.log("getMetadata succeeded ", metadata);
  } catch (e) {
    throw new Error("getMetadata error");
  }

  // const numChunks =  Math.ceil(metadata.bits / segmentSize);

  const chunkDuration = metadata.duration / numSegments;

  let segments = [];

  for (let i = 0; i < Math.ceil(metadata.duration / chunkDuration); i++) {
    const start = i * chunkDuration;
    segments.push({
      start,
      end: Math.min(chunkDuration + start, metadata.duration),
    });
  }

  return segments;
}

function getMetadata(path) {
  return new Promise((resolve, reject) => {
    const ffprobeProcess = spawn("ffprobe", [
      "-v",
      "error",
      "-print_format",
      "json",
      "-show_format",
      "-show_streams",
      path,
    ]);

    let data = "";

    ffprobeProcess.stdout.on("data", (chunk) => {
      data += chunk;
    });

    ffprobeProcess.on("close", () => {
      try {
        const parsed = JSON.parse(data);
        const duration = parseFloat(parsed.format.duration);
        const bits = parseFloat(parsed.format.size) * 8;

        resolve({ duration, bits });
      } catch (error) {
        reject(error);
      }
    });

    ffprobeProcess.on("error", (error) => {
      reject(error);
    });
  });
}
