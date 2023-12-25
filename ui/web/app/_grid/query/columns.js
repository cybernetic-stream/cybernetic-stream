import { GRID_DETAIL_PANEL_TOGGLE_COL_DEF } from "@mui/x-data-grid-premium";

export const columns = [
  {
    ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
    width: 100,
    sortable: false,
    align: "center",
    renderCell: (params) => {
      // Styling to take up full cell space and center content
      const cellStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      };

      return <div style={cellStyle}>{params.row.name}</div>;
    },
  },
];
