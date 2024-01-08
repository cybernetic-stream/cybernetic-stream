import { useEffect, useState } from "react";

export default function useListener({
  collection,
  where,
  orderBy,
  initialData,
}) {
  const [state, setState] = useState(
    typeof initialData === "undefined" ? {} : initialData,
  );

  useEffect(() => {
    async function init() {
      const { initializeApp, getApps } = await import("firebase/app");
      const {
        getFirestore,
        collection: firestoreCollection,
        onSnapshot,
        orderBy: firestoreOrderBy,
        query,
        where: firestoreWhere,
      } = await import("firebase/firestore");

      let app;
      if (!getApps().length) {
        app = initializeApp({
          apiKey: "AIzaSyAsxlVoVu08VZJpI2bzdYUruuQafQZyg3M",
          authDomain: "projectid-x.firebaseapp.com",
          projectId: "projectid-x",
          storageBucket: "projectid-x.appspot.com",
          messagingSenderId: "211384317349",
          appId: "1:211384317349:web:d3d7253dd24942e695244c",
        });
      } else {
        app = getApps()[0];
      }
      const db = getFirestore();

      let queryRef = firestoreCollection(db, collection);

      if (where && where.length) {
        where.forEach((clause) => {
          queryRef = query(queryRef, firestoreWhere(...clause));
        });
      }

      if (orderBy && orderBy.length) {
        orderBy.forEach((clause) => {
          queryRef = query(queryRef, firestoreOrderBy(...clause));
        });
      }

      onSnapshot(queryRef, async (snapshot) => {
        const update = {};

        snapshot.docs.forEach((doc) => {
          update[doc.id] = { ...doc.data() };
        });
        setState(update);
      });
    }

    init().then();
  }, []);

  return state;
}
