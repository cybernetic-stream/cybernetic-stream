import { useEffect, useState } from "react";
import useListener from "../utility/useListener";
export default function usePreloadFleetSourcingIntentImages() {
  const [imageCache, setImageCache] = useState({});

  const fleetSourcingIntent = useListener({
    collection: "FleetSourcing",
    where: [["status", "==", "active"]],
    orderBy: [["date", "asc"]],
  });

  useEffect(() => {
    const loadImageBlobs = async () => {
      for (const vehicle of Object.values(fleetSourcingIntent)) {
        for (const src of vehicle.images) {
          try {
            const response = await fetch(src);
            const blob = await response.blob();
            const blobURL = URL.createObjectURL(blob);
            setImageCache((prev) => ({
              ...prev,
              [src]: blobURL,
            }));
          } catch (error) {
            console.error("Error fetching image:", error);
          }
        }
      }
    };

    loadImageBlobs();
  }, [fleetSourcingIntent]);

  return imageCache;
}
