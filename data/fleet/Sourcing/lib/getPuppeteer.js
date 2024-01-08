import puppeteer from "puppeteer";

export default async function getPuppeteer() {
  console.log(process.env.IS_CONTAINER)
  
  return await puppeteer.launch(
    process.env.IS_CONTAINER
      ? {
          headless: 'new',
          executablePath: "/usr/bin/google-chrome",
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        }
      : {
          headless: false,
        },
  );
}
