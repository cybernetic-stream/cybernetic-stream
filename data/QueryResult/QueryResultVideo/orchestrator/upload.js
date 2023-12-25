import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import path, { basename, extname } from "path";
import fs from "fs";
import db from "./db.js";

export default async function upload(outputFilename) {
  return new Promise(async (resolve, reject) => {
    const filePath = path.resolve(outputFilename);
    const fileStream = fs.createReadStream(filePath);

    await new S3Client({
      endpoint:
        "https://6ce4136310d824f1913793767b70aad8.r2.cloudflarestorage.com",
      region: "auto",
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    }).send(
      new PutObjectCommand({
        Bucket: "video",
        Key: basename(outputFilename, extname(outputFilename)),
        Body: fileStream,
        ContentType: "Video/mp4",
      }),
    );

    await db(basename(outputFilename, extname(outputFilename))).set(
      {
        status: "succeeded",
      },
      {
        merge: true,
      },
    );
    resolve();
  });
}
