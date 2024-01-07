import getPuppeteer from "./getPuppeteer.js";
import adesaLogin from "./adesaLogin.js";
import upload from "./upload.js";

export default async function listing(id) {
  const browser = await getPuppeteer();
  const page = await browser.newPage();

  await page.goto(
    `https://openauction.prod.nw.adesa.com/mfe/vdp?vehicleId=${id}&retail_view=true`,
    {
      waitUntil: "domcontentloaded",
    },
  );

  await adesaLogin(page);

  await page.waitForSelector(".vdp-header-buttons");

  const html = await page.content();

  await browser.close();

  return upload(html, `adesa/listing/${id}/${Date.now()}.html`);
}
