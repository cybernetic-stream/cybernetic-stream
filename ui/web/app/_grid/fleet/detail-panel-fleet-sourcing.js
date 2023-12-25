"use client";
import { Masonry } from "@mui/lab";
import { ImageCacheContext } from "../utility/ImageCacheContext";
import { useContext } from "react";

export default function DetailPanelFleetSourcing({ row }) {
  const imageCache = useContext(ImageCacheContext);

  return (
    <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
      <Masonry spacing={0} columns={2}>
        {row.images.map((src, index) => {
          return (
            <img
              key={index}
              src={imageCache[src] || src}
              alt={`Image ${index}`}
              onError={(e) => {
                if (e.target.src !== src) {
                  e.target.src = src;
                }
              }}
            />
          );
        })}
      </Masonry>
    </div>
  );
}
