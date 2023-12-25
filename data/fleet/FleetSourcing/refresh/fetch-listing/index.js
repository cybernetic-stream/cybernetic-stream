import express from "express";
import puppeteer from "puppeteer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const app = express();

app.get("/", async (req, res) => {
  const { id } = req.query;

  const browser = await puppeteer.launch(
    process.env.IS_CONTAINER
      ? {
          executablePath: "/usr/bin/google-chrome",
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        }
      : {
          headless: false,
          executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        },
  );

  const page = await browser.newPage();
  await page.goto(
    `https://openauction.prod.nw.adesa.com/mfe/vdp?vehicleId=${id}&retail_view=true`,
    {
      waitUntil: "domcontentloaded",
    },
  );

  await page.waitForSelector("#accountName");
  await page.type("#accountName", "fhWsmYgxXz");
  await page.type("#password", process.env.ADESA_PASSWORD);
  await page.click("#loginSubmit");
  await page.waitForSelector(".vdp-header-buttons");

  const htmlBuffer = Buffer.from(await page.content(), "utf8");
  await browser.close();
  const key =
    `openauction.prod.nw.adesa.com/mfe/vdp/vehicleId=${id}&retail_view=true/${Date.now()}.html`.replace(
      "?",
      "/",
    );
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
      Bucket: "data-collection-scrape",
      Key: key,
      Body: htmlBuffer,
      ContentType: "text/html",
    }),
  );

  res.json({
    url: "https://data-collection-scrape.cyberneticstream.com/" + key,
  });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
