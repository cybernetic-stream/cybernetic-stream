import { numberFormat } from "../utility/numberFormat";

export default function columns(sublicenses) {
  return [
    {
      field: "place",
      valueFormatter: (param) => getSublicenseName(param, sublicenses),
      width: 167.05,
      sortable: false,
      flex:
        typeof window !== "undefined"
          ? window.innerWidth > 430
            ? null
            : 2
          : null,
    },
    {
      field: "amount",
      width: 80,
      type: "number",
      hideHeader: true,
      valueFormatter: (param) => numberFormat(param.value / 100),
      sortable: false,
      flex:
        typeof window !== "undefined"
          ? window.innerWidth > 430
            ? null
            : 0.95
          : null,
    },
    {
      field: "name",
      width: 82,
      headerAlign: "right",
      align: "right",
      sortable: false,
      flex:
        typeof window !== "undefined"
          ? window.innerWidth > 430
            ? null
            : 1
          : null,
    },
    {
      field: "status",
      width: 106,
      sortable: false,
      flex:
        typeof window !== "undefined"
          ? window.innerWidth > 430
            ? null
            : 1.3
          : null,
      valueFormatter: (param) =>
        numberFormat(
          param.value === "requires_payment_method" ? "unlocked" : param.value,
        ),
    },
  ];
}

function getSublicenseName(params, place) {
  return !params.value ? "" : place[params.value].name;
}

const initialState = {
  aggregation: {
    model: {
      amount: "sum",
    },
  },
};
