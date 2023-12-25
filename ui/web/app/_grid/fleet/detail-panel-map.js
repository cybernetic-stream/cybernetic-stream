import { useContext, useEffect } from "react";
import Script from "next/script";
import { FleetDriveStateContext } from "./index";

export default function DetailPanelMap({ row, prefetch }) {
  const fleetDriveState = useContext(FleetDriveStateContext);

  useEffect(() => {
    updateDriveState(row.id, fleetDriveState);

    const intervalId = setInterval(() => {
      updateDriveState(row.id, fleetDriveState);
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [fleetDriveState]);

  useEffect(() => {
    if (typeof window.initMap !== "undefined") {
      window.initMap();
    }
    return () => {
      if (typeof window.destroyMap !== "undefined") {
        window.destroyMap();
      }
    };
  }, []);

  return (
    <div
      className={
        prefetch
          ? "text-center text-lg fixed inset-0 invisible "
          : "text-center text-lg relative w-full h-screen float-left"
      }
    >
      <div id="map-container" className="w-full map-height">
        <Script id="d" src="/map121623.js" />
      </div>
    </div>
  );
}

function updateDriveState(id, fleetDriveState) {
  window.currentDriveState = id;
  if (typeof window.driveState === "undefined") {
    window.driveState = {};
  }

  window.driveState[id] = {
    latitude: fleetDriveState[id].latitude,
    longitude: fleetDriveState[id].longitude,
    title: fleetDriveState[id].address,
    gps_as_of: fleetDriveState[id].gps_as_of,
    glyphText: glyphText(fleetDriveState[id].gps_as_of),
  };
}

function glyphText(timestampInSeconds) {
  const now = Math.floor(Date.now() / 1000);
  let diff = Math.abs(now - timestampInSeconds);
  if (diff < 10) {
    return "‍";
  } else if (diff < 60) {
    return `${diff}s`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}m`;
  } else {
    return `${Math.floor(diff / 3600)}h`;
  }
}
