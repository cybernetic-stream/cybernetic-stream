export default async function handleRoot(){
    const searchResults = await fetch(
        "https://data-collection-fleet-sourcing-get-search-results-2aqyt6m5mq-wl.a.run.app/",
        )
    .then((x) => x.json())
    .then((x) => x.url);
    console.log("search results: ", searchResults);
    const parsedSearchResults = await fetch(
        "https://data-collection-feet-sourcing-parse-search-result-2aqyt6m5mq-wl.a.run.app",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                search_results_url: searchResults,
            }),
        },
        ).then((x) => x.json());
    console.log("parsed search results: ", parsedSearchResults);

    const notIn = await db
    .collection("FleetSourcing")
    .where("status", "==", "active")
    .get();

    for (const doc of notIn.docs) {
        if (typeof parsedSearchResults[doc.id] !== "undefined") {
            continue;
        }
        await db
      .collection("FleetSourcing")
      .doc(doc.id)
      .set({ status: "inactive" }, { merge: true })
      .then((x) => console.log(`set ${doc.id} inactive`));
    }

    for (const elem of parsedSearchResults) {
        console.log(`processing ${elem.vin}`);
        const docRef = db.collection("FleetSourcing").doc(elem.vin);
        const doc = await docRef.get();

        const update = {
            source_id: elem.source_id,
            exterior_color: elem.exterior_color,
            interior_color: elem.interior_color,
            odometer: elem.odometer,
            seller: elem.seller,
            as_of: Timestamp.now(),
            date: Timestamp.fromDate(new Date(elem.date)),
            status: "active",
        };

        if (!doc.exists) {
            update.created = Timestamp.now();
        }

        if (
            !doc.exists ||
      typeof doc.data().images === "undefined" ||
      doc.data().images.length <= 5
      ) {
            const listing = (
                await fetch(
                    `https://data-collection-fleet-sourcing-get-listing-2aqyt6m5mq-wl.a.run.app?id=${elem.source_id}`,
                    ).then((x) => x.json())
                    ).url;
            const images = await fetch(
                `https://data-collection-fleet-sourcing-get-listing-images-2aqyt6m5mq-wl.a.run.app?listing_url=${encodeURIComponent(
                    listing,
                    )}`,
                    ).then((x) => x.json());
            update.images = images;
            console.log(`images ${elem.vin}`, images);
        }

        await docRef.set(update, { merge: true });
        console.log("updated", elem.vin);
    }

    console.log(`done ${new Date()}`);

    res.send();
}