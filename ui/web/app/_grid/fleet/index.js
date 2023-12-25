"use client";
import { createContext, Suspense, useContext } from "react";
import Styled from "../utility/styled";
import DetailPanelMap from "./detail-panel-map";
import columns from "./columns";
import DetailPanelFleetSourcing from "./detail-panel-fleet-sourcing";
import { FooterContext } from "../utility/FooterContext";
import useAutoRefreshTelemetry from "./useAutoRefreshTelemetry";
export const FleetDriveStateContext = createContext({});

export default function Index({ rows, fleetDriveState }) {
  const footer = useContext(FooterContext);
  useAutoRefreshTelemetry(fleetDriveState);

  return (
    <>
      <Styled
        rows={rows}
        columns={columns()}
        density="compact"
        getDetailPanelContent={(params) =>
          params.row.latitude ? (
            <FleetDriveStateContext.Provider value={fleetDriveState}>
              <DetailPanelMap row={params.row} />
            </FleetDriveStateContext.Provider>
          ) : (
            <DetailPanelFleetSourcing row={params.row} />
          )
        }
        getDetailPanelHeight={() => "auto"}
        slots={{
          columnHeaders: () => null,
          footer: footer,
          noRowsOverlay: () => null,
        }}
        disableColumnMenu
        experimentalFeatures={{ aggregation: true }}
      />

      <Suspense>
        <FleetDriveStateContext.Provider value={fleetDriveState}>
          {Object.keys(fleetDriveState).map((elem) => (
            <DetailPanelMap
              key={elem}
              prefetch={true}
              id={Math.random().toString(16)}
              row={{ ...fleetDriveState[elem], id: elem }}
            />
          ))}
        </FleetDriveStateContext.Provider>
      </Suspense>
    </>
  );
}
