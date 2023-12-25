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
          apiKey: "AIzaSyAYeaFR2_91kcRKNLy1okBcSGlMcu1F3tE",
          authDomain: "projectname-o.firebaseapp.com",
          projectId: "projectname-o",
          storageBucket: "projectname-o.appspot.com",
          messagingSenderId: "131875772321",
          appId: "1:131875772321:web:7bb1f2f14568b5e0715de0",
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
