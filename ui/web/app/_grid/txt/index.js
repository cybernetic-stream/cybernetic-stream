"use client";
import Styled from "../utility/styled";
import { columns } from "./columns";

export default function Txt({ rows }) {
  return (
    <Styled
      rows={rows}
      columns={columns}
      density="compact"
      hideFooter
      slots={{
        columnHeaders: () => null,
        noRowsOverlay: () => null,
      }}
      disableColumnMenu
      experimentalFeatures={{ aggregation: true }}
    />
  );
}
