"use client";
import { useContext, useEffect, useState } from "react";
import Styled from "../utility/styled";
import toRows from "../utility/toRows";

import columns from "./columns";
import { useGridApiRef } from "@mui/x-data-grid-premium";
import { initialState } from "./initalState";
import { FooterContext } from "../utility/FooterContext";

export default function Payment(props) {
  const footer = useContext(FooterContext);

  const apiRef = useGridApiRef();

  const [filterModel, setFilterModel] = useState({
    items: [
      {
        field: "status",
        operator: "isAnyOf",
        value: ["requires_payment_method", "requires_action"],
      },
    ],
  });

  const [rows, setRows] = useState([]);
  const [sublicenses, setSublicenses] = useState([]);

  useEffect(() => {
    const main = async () => {
      const { initializeApp, getApps } = await import("firebase/app");
      const {
        getFirestore,
        onSnapshot,
        query: firestoreQuery,
        collection,
        orderBy,
        where,
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

      onSnapshot(
        firestoreQuery(collection(db, "Payment"), orderBy("created", "desc")),
        async (snapshot) => {
          const update = {};
          snapshot.docs.forEach((doc) => {
            update[doc.id] = doc.data();
          });
          setRows(toRows(update));
        },
      );
      onSnapshot(
        firestoreQuery(collection(db, "Sublicense")),
        async (snapshot) => {
          const update = {};
          snapshot.docs.forEach((doc) => {
            update[doc.id] = doc.data();
          });
          setSublicenses(update);
        },
      );
    };
    main();
  }, []);

  return (
    <Styled
      rows={rows}
      filterModel={filterModel}
      columns={columns(sublicenses)}
      slots={{
        footer: props.footer,
        noRowsOverlay: () => null,
        columnHeaders: () => null,
      }}
      density="compact"
      {...props}
      initialState={initialState}
    />
  );
}
