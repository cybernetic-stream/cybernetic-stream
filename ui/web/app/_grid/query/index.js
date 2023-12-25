"use client";
import { useContext, useEffect } from "react";
import Styled from "../utility/styled";
import { columns } from "./columns";
import { FooterContext } from "../utility/FooterContext";
import Txt from "../txt";
import Video from "../video";

export default function Query({
  queryResponseBingRows,
  queryResponseYoutube,
  queryResponseGoogleRows,
}) {
  const footer = useContext(FooterContext);

  useEffect(() => {
    console.log(0);
    console.log(queryResponseBingRows);
    console.log(queryResponseYoutube);
    console.log(queryResponseGoogleRows);
  }, []);

  const rows = [
    {
      name: "-",
      detailPanel: "google",
      id: 1,
    },
    {
      name: "-",
      detailPanel: "youtube",
      id: 2,
    },
    {
      name: "-",
      detailPanel: "bing",
      id: 0,
    },
  ];

  const index = {
    bing: <Txt rows={queryResponseBingRows} />,
    google: <Txt rows={queryResponseGoogleRows} />,
    youtube: <Video data={queryResponseYoutube} />,
  };

  return (
    <Styled
      rows={rows}
      columns={columns}
      density="compact"
      getDetailPanelContent={(params) => {
        return index[params.row.detailPanel];
      }}
      getDetailPanelHeight={() => "auto"}
      slots={{
        footer: footer,
        noRowsOverlay: () => null,
        columnHeaders: () => null,
      }}
      disableColumnMenu
      experimentalFeatures={{ aggregation: true }}
    />
  );
}
