"use client";
import { useEffect, useState } from "react";
import { FooterContext } from "./utility/FooterContext";
import ImportedFooter from "./footer";
import { ImageCacheContext } from "./utility/ImageCacheContext";
import usePreloadFleetSourcingIntentImages from "./fleet/usePreloadFleetSourcingIntentImages";
import useListener from "./utility/useListener";
import toRows from "./utility/toRows";
import Sublicense from "./sublicense";
import BalanceTransaction from "./balance-transaction";
import Fleet from "./fleet";
import Object from "./object";
import Connections from "./connections";
import Ai from "./ai";
import Query from "./query";

export default function Index({ sublicenseInitialData, query }) {
  const [current, setCurrent] = useState(
    query ? "query" : "balanceTransaction",
  );

  const queryResponseBing = useListener({
    collection: "QueryResult",
    where: [
      ["query", "==", typeof query !== "undefined" ? query : null],
      ["source", "==", "bing"],
    ],
    orderBy: [["index", "asc"]],
  });

  useEffect(() => {
    console.log(queryResponseBing);
    console.log('casting a spell ...')
  }, [queryResponseBing]);

  const queryResponseYoutube = useListener({
    collection: "QueryResultVideo",
    where: [["query", "==", typeof query !== "undefined" ? query : null]],
    orderBy: [["index", "asc"]],
  });

  const queryResponseGoogle = useListener({
    collection: "QueryResult",
    where: [
      ["query", "==", typeof query !== "undefined" ? query : null],
      ["source", "==", "google"],
    ],
    orderBy: [["index", "asc"]],
  });

  const preloadedImages = usePreloadFleetSourcingIntentImages();

  const fleetDriveState = useListener({
    collection: "FleetDriveState",
  });

  const fleetSourcingIntent = useListener({
    collection: "FleetSourcing",
    where: [["status", "==", "active"]],
    orderBy: [["date", "asc"]],
  });

  const sublicense = useListener({
    collection: "Sublicense",
    orderBy: [
      ["created", "desc"],
      ["name", "asc"],
    ],
    initialData: sublicenseInitialData,
  });

  const [footerModel, setFooterModel] = useState(
    typeof query === "undefined"
      ? ["fleet", "sublicense"]
      : ["balanceTransaction", "fleet", "sublicense"],
  );

  useEffect(() => {
    console.log(queryResponseBing);
    console.log(queryResponseYoutube);
    console.log(queryResponseGoogle);
  }, [queryResponseYoutube, queryResponseBing, queryResponseGoogle]);

  const index = {
    balanceTransaction: <BalanceTransaction />,
    fleet: (
      <ImageCacheContext.Provider value={preloadedImages}>
        <Fleet
          rows={toRows({ ...fleetDriveState, ...fleetSourcingIntent })}
          fleetDriveState={fleetDriveState}
        />
      </ImageCacheContext.Provider>
    ),
    sublicense: <Sublicense rows={toRows(sublicense)} />,
    object: <Object />,
    connections: <Connections />,
    ai: <Ai />,
    query: (
      <Query
        queryResponseBingRows={toRows(queryResponseBing)}
        queryResponseYoutube={toRows(queryResponseYoutube)}
        queryResponseGoogleRows={toRows(queryResponseGoogle)}
      />
    ),
  };

  return (
    <FooterContext.Provider
      value={() => (
        <ImportedFooter
          setCurrent={setCurrent}
          current={current}
          model={footerModel}
          setModel={setFooterModel}
        />
      )}
    >
      {index[current]}
    </FooterContext.Provider>
  );
}
