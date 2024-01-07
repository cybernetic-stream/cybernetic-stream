import getPuppeteer from "./getPuppeteer.js";
import upload from "./upload.js";
import adesaLogin from "./adesaLogin.js";

export default async function searchResults(query) {
  const browser = await getPuppeteer();
  const page = await browser.newPage();

  await page.goto("https://openauction.prod.nw.adesa.com/mfe/search" + query, {
    waitUntil: "domcontentloaded",
  });

  await adesaLogin(page);

  await page.waitForSelector("#vehicleListing");

  const html = await page.content();

  await browser.close();

  return upload(
    html,
    `adesa/search-results/${query.replace("?", "")}/${Date.now()}.html`,
  );
}
