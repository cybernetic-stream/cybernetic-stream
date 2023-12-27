export default async function getPuppeteer() {
  return await puppeteer.launch(
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
}
