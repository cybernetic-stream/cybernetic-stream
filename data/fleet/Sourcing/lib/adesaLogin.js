export default async function adesaLogin(page) {
  await page.waitForSelector("#accountName");
  await page.type("#accountName", "fhWsmYgxXz");
  await page.type("#password", 'NE7*p3!hNzKcbkgfL4mB');
  await page.click("#loginSubmit");
}
