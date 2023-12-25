"use client";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { DataGridPremium } from "@mui/x-data-grid-premium";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "white",
    },
  },
});

const MyThemeComponent = styled(DataGridPremium)(({ theme }) => ({
  border: 0,
  fontFamily: "var(--font-SFMono)",
  height: "100vh",
  width: "100vw",
  maxHeight: ["-webkit-fill-available", "-moz-available", -"fill-available"],
  "& .MuiDataGrid-cell, .MuiDataGrid-columnHeaders, .MuiDataGrid-pinnedRows,  .MuiDataGrid-detailPanel, .MuiButtonBase-root,  .MuiInputBase-input, .MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall.MuiDataGrid-booleanCell.css-ptiqhd-MuiSvgIcon-root, .MuiPaper-root.MuiMenu-paper.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper.css-qa8avv-MuiPaper-root-MuiMenu-paper-MuiPopover-paper, .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeSmall.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root, .MuiInputLabel-root, .MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall.MuiDataGrid-booleanCell.css-1k33q0, .MuiDataGrid-footerCell.MuiBox-root.css-k6w1hd-MuiDataGrid-footerCell6, .MuiDataGrid-footerCell.MuiBox-root.css-9oshql, .MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall.MuiDataGrid-booleanCell.css-1k33q06, .MuiDataGrid-footerCell":
    {
      borderBottom: "none",
      color: "white !important",

      backgroundColor: "black",
    },
  "& .css-242qj4-MuiDataGrid-aggregationColumnHeaderLabel, .MuiDataGrid-aggregationColumnHeaderLabel.css-19dq90j":
    {
      color: "rgb(255, 255, 255) !important",
    },
  "& .MuiDataGrid-pinnedRows--bottom button": {
    display: "none",
  },
}));

export default function Styled(props) {
  return (
    <ThemeProvider theme={customTheme}>
      <MyThemeComponent {...props} />
    </ThemeProvider>
  );
}
