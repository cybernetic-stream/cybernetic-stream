import { useEffect } from "react";

function refreshTelemetry(id) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    id,
  });
  fetch("https://fleet-drive-state-refresh.cyberneticstream.workers.dev", {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
  }).catch((error) => console.log("error", error));
  return 0;
}

export default function useAutoRefreshTelemetry(fleetDriveState) {
  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "mouseup",
      "click",
      "click",
      "keydown",
      "keyup",
      "touchstart",
      "touchmove",
      "scroll",
    ];

    window.last_interaction = new Date();

    events.forEach((event) => {
      window.addEventListener(event, () => {
        window.last_interaction = new Date();
      });
    });

    const intervalId = setInterval(async () => {
      const requests = [];
      for (const key in fleetDriveState) {
        if (
          Date.now() - fleetDriveState[key].gps_as_of * 1000 >= 4000 &&
          Date.now() - window.last_interaction.getTime() < 120000
        ) {
          console.log(key);
          requests.push(refreshTelemetry(key));
        }
      }
      await Promise.all(requests);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      events.forEach((event) => {
        window.removeEventListener(
          event,
          (window.last_interaction = new Date()),
        );
      });
    };
  }, [fleetDriveState]);
}
