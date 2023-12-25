import { numberFormat } from "../utility/numberFormat";

export default function columns() {
  function FinancialAccountIdentifierDisplayDynamicPhoneNumberButton({ x }) {
    if (x.row.phone_number) {
      return (
        <a
          href={`tel: ${x.row.phone_number}`}
          onClick={() => navigator.clipboard.writeText(x.row.phone_number)}
        >{`${x.row.institution_id.replaceAll("ins_", "")}-${x.row.mask}`}</a>
      );
    } else {
      return (
        <p>{`${x.row.institution_id.replaceAll("ins_", "")}-${x.row.mask}`}</p>
      );
    }
  }

  return [
    {
      field: "",
      width: 145,
      sortable: false,
      renderCell: (x) => (
        <FinancialAccountIdentifierDisplayDynamicPhoneNumberButton x={x} />
      ),
    },
    {
      field: "available",
      valueFormatter: (param) =>
        truncateNumberString(numberFormat(param.value)),
      width: 170,
      sortable: false,
      type: "number",
    },
  ];
}

function truncateNumberString(str) {
  if (typeof str !== "string") {
    return null;
  }
  return str.split(".").shift();
}
