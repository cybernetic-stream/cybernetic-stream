export default async function handleListingImages(req, res) {
  for (const [index, img] of Array.from(images).entries()) {
    const key = `${
      listingURL.split("/")[6].split("&")[0].split("=")[1]
    }/${index}`;

    try {
      console.log(img.src);
      const response = await fetch(img.src);
      const buffer = Buffer.from(await response.arrayBuffer());
      new S3Client({
        endpoint:
          "https://6ce4136310d824f1913793767b70aad8.r2.cloudflarestorage.com",
        region: "auto",
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
      })
        .send(
          new PutObjectCommand({
            Bucket: "update",
            Key: key,
            Body: buffer,
            ContentType: "image/jpeg",
          }),
        )
        .then(async (res) => {
          const form = new FormData();
          form.append(
            "url",
            "https://fleet-sourcing.cyberneticstream.com/" + key,
          );
          form.append("id", key);
          try {
            const response = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/6ce4136310d824f1913793767b70aad8/images/v1`,
              {
                method: "POST",
                body: form,
                headers: {
                  Authorization: `Bearer N883HZtoTzonUwjU4CJf4HpaTjWG4HFkGwtL8vAA`,
                },
              },
            )
              .then(async (x) => {
                console.log(await x.json());
                console.log("uploaded to cdn");
              })
              .catch((res) => console.error(res));
          } catch (error) {
            console.error("Error uploading to Cloudflare:", error);
            throw error;
          }
          console.log(key);
        });
    } catch (uploadError) {
      console.error(`Error uploading ${img.src}:`, uploadError);
    }
    returnArray.push(
      "https://imagedelivery.net/TgyYfXLmYx-JJG3tKWEdbw/" +
        key +
        "/variantName",
    );
  }
  res.json(returnArray);
}
