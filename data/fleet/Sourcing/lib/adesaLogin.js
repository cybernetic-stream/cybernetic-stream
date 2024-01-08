export default async function adesaLogin(page) {
  await page.waitForSelector("#accountName");
  await page.type("#accountName", "fhWsmYgxXz");
  await page.type("#password", process.env.ADESA_PASSWORD);
  await page.click("#loginSubmit");
}
