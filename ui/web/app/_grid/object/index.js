"use client";
import { useContext } from "react";
import Styled from "../utility/styled";
import toRows from "../utility/toRows";
import columns from "./columns";
import useListener from "../utility/useListener";
import { FooterContext } from "../utility/FooterContext";

export default function Object(props) {
  const rows = useListener({
    collection: "Object",
  });
  const footer = useContext(FooterContext);

  return (
    <Styled
      rows={toRows(rows)}
      columns={columns()}
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
