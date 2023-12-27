export default async function handleParse(req, res){
    const { search_results_url: searchResultsURL } = req.body;

    const returnArray = [];
    console.log(searchResultsURL);

    const vehicleElements = (
        await JSDOM.fromURL(searchResultsURL)
        ).window.document.querySelectorAll(".vehicle-wrapper.row");

    for (const vehicle of vehicleElements) {
        const year = vehicle
      .querySelector(".vehicle-title a")
      ?.textContent.trim()
      .charAt(3);
        const vin = vehicle
      .querySelector(".vin")
      ?.textContent.replace("VIN ", "")
      .trim();
        const seller = vehicle
      .querySelector(".sellerOrg")
      ?.textContent.trim()
      .toLowerCase();
        const autoGrade = vehicle.querySelector(".grade")
      ? Number(vehicle.querySelector(".grade").textContent.match(/[\d\.]+/)[0])
      : undefined;
        const dateData = vehicle.querySelectorAll(".timer");

        const source_id = new URL(
            vehicle.querySelector("a.vehicleLink").href,
            ).searchParams.get("vehicleId");

        const odometerElement = vehicle.querySelector(".feed-text.col-lg-12.col-7");
        const interiorElement = vehicle.querySelector(
            ".feed-text.col-lg-12.col-7.custom-mar2",
            );
        const exteriorElement = vehicle.querySelector(
            ".feed-text.col-lg-12.col-7.custom-mar1",
            );

        const odometer = odometerElement
      ? parseInt(odometerElement.textContent.replace(/[^0-9]/g, ""), 10)
      : null;
        const interior_color = interiorElement
      ? interiorElement.textContent.trim().toLowerCase()
      : "";
        const exterior_color = exteriorElement
      ? exteriorElement.textContent.trim().toLowerCase()
      : "";

        const vehicleData = {
            source_id,
            year,
            vin,
            seller,
            autoGrade,
            odometer,
            interior_color,
            exterior_color,
            date: parseDate(
                dateData[0].textContent + " " + dateData[1].textContent,
                ).toISOString(),
        };
        returnArray.push(vehicleData);
    }
    res.json(returnArray);
}