import { GRID_DETAIL_PANEL_TOGGLE_COL_DEF } from "@mui/x-data-grid-premium";

export default function columns() {
  return [
    {
      ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
      renderCell: (params) => {
        if (typeof params.row.longitude === "undefined") {
          return <div className={"w-full h-full"}></div>;
        }
        let formattedLongitude =
          params.row.longitude > 0
            ? "+" + params.row.longitude
            : params.row.longitude;
        return (
          <>
            <div className={"w-full h-full"}></div>
            <div>
              <span>{`${params.row.latitude}`}</span>
              <span className={""}>{`${formattedLongitude}`}</span>
            </div>
          </>
        );
      },
      width: 185,
      align: "center",
    },
    {
      field: "unlock",
      width: 70,
      renderCell: (params) => {
        if (typeof params.row.longitude === "undefined") {
          if (params.row.exterior_color === "blue") {
            return "e";
          }
          return params.row.exterior_color.substring(0, 1);
        }
        return (
          <button onClick={() => onPress(params.row.id, "door_unlock")}>
            unlock
          </button>
        );
      },
      align: "center",
    },
    {
      field: "lock",
      align: "center",
      width: 55,
      renderCell: (params) => {
        if (typeof params.row.longitude === "undefined") {
          return params.row.interior_color.substring(0, 1);
        }
        return (
          <button onClick={() => onPress(params.row.id, "door_lock")}>
            lock
          </button>
        );
      },
    },
    {
      field: "drive",
      align: "center",
      width: 55,
      renderCell: (params) => {
        if (typeof params.row.longitude === "undefined") {
          return <span>{`${daysFromNow(params.row.date.toDate())}`}</span>;
        }
        return (
          <button onClick={() => onPress(params.row.id, "remote_start_drive")}>
            drive
          </button>
        );
      },
    },
  ];
}
function daysFromNow(providedDate) {
  const now = new Date();
  const differenceInTime = providedDate.getTime() - now.getTime();

  if (differenceInTime < 1000 * 3600 * 24) {
    let hours = Math.floor(differenceInTime / (1000 * 3600));
    hours = Math.max(hours, 0); // Ensuring hours do not go negative
    return `${hours}h`;
  } else {
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  }
}

async function onPress(id, command) {
  return await fetch(
    `https://fleet-command.cyberneticstream.com?id=${id}&command=${command}`,
    { method: "POST", body: "{}" },
  ).then((x) => console.log(x.status));
}
