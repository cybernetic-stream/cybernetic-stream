export default async function preloadFleetSourcingIntentImages() {
  const { initializeApp, getApps } = await import("firebase/app");
  const { getFirestore, collection, query, where, getDocs } = await import(
    "firebase/firestore"
  );
  let app;
  if (!getApps().length) {
    app = initializeApp({
      apiKey: "AIzaSyAYeaFR2_91kcRKNLy1okBcSGlMcu1F3tE",
      authDomain: "projectname-o.firebaseapp.com",
      projectId: "projectname-o",
      storageBucket: "projectname-o.appspot.ccom",
      messagingSenderId: "131875772321",
      appId: "1:131875772321:web:7bb1f2f14568b5e0715de0",
    });
  } else {
    app = getApps()[0];
  }
  const db = getFirestore();
  const fleetSourcingIntentCollection = query(
    collection(db, "FleetSourcing"),
    where("status", "==", "active"),
  );
  const fleetSourcingIntentSnapshot = await getDocs(
    fleetSourcingIntentCollection,
  );

  let imageUrls = [];
  fleetSourcingIntentSnapshot.forEach((doc) => {
    const images = doc.data().images; // Assuming 'images' is an array of image URLs
    if (images) {
      imageUrls = [...imageUrls, ...images];
    }
  });

  const fetchPromises = imageUrls.map((url) =>
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        setPreLoadedImages((prevImages) => ({
          ...prevImages,
          [url]: blobUrl,
        }));
      })
      .catch((e) => {
        console.error(e);
        return null;
      }),
  );

  await Promise.all(fetchPromises);
}
