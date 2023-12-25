import { numberFormat } from "../utility/numberFormat";

export const columns = [
  {
    field: "name",
    width: 170,
    sortable: false,
  },
  {
    field: "price",
    width: 106,
    type: "number",
    valueFormatter: (param) => numberFormat(param.value),
    sortable: false,
  },
  {
    field: "value",
    width: 106,
    type: "number",
    valueFormatter: (param) => numberFormat(param.value),
    sortable: false,
  },
  {
    field: "expenses",
    headerName: "-",
    width: 75,
    type: "number",
    sortable: false,
    valueFormatter: (param) => numberFormat(param.value),
    flex:
      typeof window !== "undefined"
        ? window.innerWidth > 430
          ? null
          : 0.0001
        : null,
  },
];
