"use client";
import Styled from "../utility/styled";
import toRows from "../utility/toRows";
import columns from "./columns";
import useListener from "../utility/useListener";
import { FooterContext } from "../utility/FooterContext";
import { useContext } from "react";

export default function Ai(props) {
  const rows = useListener({
    collection: "Message",
  });
  const footer = useContext(FooterContext);

  return (
    <Styled
      rows={toRows(rows)}
      columns={[]}
      density="compact"
      slots={{
        columnHeaders: () => null,
        footer: footer,
        noRowsOverlay: () => null,
      }}
      disableColumnMenu
      experimentalFeatures={{ aggregation: true }}
      {...props}
    />
  );
}
