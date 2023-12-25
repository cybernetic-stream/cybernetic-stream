"use client";
import { useContext } from "react";
import Styled from "../utility/styled";
import columns from "./columns";
import { FooterContext } from "../utility/FooterContext";
export default function BalanceTransaction(props) {
  const footer = useContext(FooterContext);

  return (
    <Styled
      rows={[]}
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
