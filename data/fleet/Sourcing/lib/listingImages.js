import upload from "./upload.js";
import { JSDOM } from "jsdom";

export default async function listingImages(url) {
  const returnArray = [];

  const images = (await JSDOM.fromURL(url)).window.document.querySelectorAll(
    ".ngx-gallery-clickable",
  );

  const unitId = new URL(url).pathname.match(/\/listing\/(\d+)\//)[1];

  for (var i = 0; i < images.length; i++) {
    returnArray.push(
      await upload(
        await fetch(
          images[i].style._values["background-image"]
            .match(/\((.*?)\)/)[1]
            .replace(/('|")/g, ""),
        ),
        `adesa/images/${unitId}/${i}.jpeg`,
      ),
    );
  }

  return returnArray;
}
