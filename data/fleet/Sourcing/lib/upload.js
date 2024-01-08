import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import FormData from "form-data";

export default async function upload(content, key) {
  let url = "https://fleet-sourcing.cyberneticstream.com/" + key;
  const storage = new S3Client({
    endpoint:
      "https://6ce4136310d824f1913793767b70aad8.r2.cloudflarestorage.com",
    region: "auto",
    credentials: {
      accessKeyId: '4aaf8dc5084920cd6dcf32c2f04e8edf',
      secretAccessKey: 'b25156e5c0b5aaa0de3dbf55d2386ee5fccdf46443e6513c11796465e2948739',
    },
  });

  if (typeof content === "string") {
    await storage.send(
      new PutObjectCommand({
        Bucket: "fleet-sourcing",
        Key: key,
        Body: Buffer.from(content, "utf8"),
        ContentType: "text/html",
      }),
    );
    return "https://fleet-sourcing.cyberneticstream.com/" + key;
  } else if (typeof content === "object") {
    await storage.send(
      new PutObjectCommand({
        Bucket: "fleet-sourcing",
        Key: key,
        Body: Buffer.from(await content.arrayBuffer()),
        ContentType: "image/jpeg",
      }),
    );
    //        const body = new FormData()
    //        body.append('url', url)
    //        body.append('id', '3')
    //        const cdnUpload = await fetch(`https://api.cloudflare.com/client/v4/accounts/6ce4136310d824f1913793767b70aad8/images/v1`, {
    //            method: 'POST',
    //            body,
    //            headers: {
    //                Authorization: `Bearer N883HZtoTzonUwjU4CJf4HpaTjWG4HFkGwtL8vAA`,
    //            }
    //        })
    //        console.log(cdnUpload)
    //        url = "https://imagedelivery.net/TgyYfXLmYx-JJG3tKWEdbw/" + '3' + '/variantName'
  }
  return url;
}
