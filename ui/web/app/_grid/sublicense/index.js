"use client";
import { useContext } from "react";
import Styled from "../utility/styled";
import toRows from "../utility/toRows";
import { columns } from "./columns";
import { initialState } from "./initialState";
import { FooterContext } from "../utility/FooterContext";

export default function Index({ rows }) {
  const footer = useContext(FooterContext);

  return (
    <Styled
      rows={toRows(rows)}
      columns={columns}
      initialState={initialState}
      density="compact"
      slots={{
        footer: footer,
        noRowsOverlay: () => null,
        columnHeaders: () => null,
      }}
      hideScrollbar
      disableColumnMenu
      disableRowSelectionOnClick
    />
  );
}
