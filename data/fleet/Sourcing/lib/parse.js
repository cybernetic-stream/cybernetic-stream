import { JSDOM } from "jsdom";

export default async function parse(url) {
  if (url.includes("search-results")) {
    return searchResults(url);
  }
}

async function searchResults(url) {
  const returnArray = [];

  for (const unit of (
    await JSDOM.fromURL(url)
  ).window.document.querySelectorAll(".vehicle-wrapper.row")) {
    const exteriorElement = unit.querySelector(
      ".feed-text.col-lg-12.col-7.custom-mar1",
    );

    const odometerElement = unit.querySelector(".feed-text.col-lg-12.col-7");
    const interiorElement = unit.querySelector(
      ".feed-text.col-lg-12.col-7.custom-mar2",
    );

    const dateData = unit.querySelectorAll(".timer");

    returnArray.push({
      year: unit
        .querySelector(".vehicle-title a")
        ?.textContent.trim()
        .charAt(3),

      vin: unit.querySelector(".vin")?.textContent.replace("VIN ", "").trim(),

      seller: unit
        .querySelector(".sellerOrg")
        ?.textContent.trim()
        .toLowerCase(),

      autoGrade: unit.querySelector(".grade")
        ? Number(unit.querySelector(".grade").textContent.match(/[\d\.]+/)[0])
        : undefined,

      source_id: new URL(
        unit.querySelector("a.vehicleLink").href,
      ).searchParams.get("vehicleId"),

      exterior_color: exteriorElement
        ? exteriorElement.textContent.trim().toLowerCase()
        : "",

      odometer: odometerElement
        ? parseInt(odometerElement.textContent.replace(/[^0-9]/g, ""), 10)
        : null,

      interior_color: interiorElement
        ? interiorElement.textContent.trim().toLowerCase()
        : "",

      date: new Date(dateData[0].textContent + " " + dateData[1].textContent),
    });
  }

  return returnArray;
}
