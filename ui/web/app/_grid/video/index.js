"use client";
import React, { useEffect } from "react";
import Masonry from "@mui/lab/Masonry";
import Paper from "@mui/material/Paper";
import Player from "@/app/_grid/video/player";

export default function Index({ data }) {
  const expectedResults = data.length > 0 ? data[0].results : 0;

  const paddedData = [...data];
  while (paddedData.length < expectedResults) {
    paddedData.push({ ...data[0], id: `${data[0].id}-${paddedData.length}` }); // Clone the first element with a unique ID
  }

  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={0}>
      {paddedData.map((video) => (
        <Paper key={video.id}>
          <Player
            audioURL={
              Array.isArray(video.stream_urls)
                ? video.stream_urls.find((url) => url.includes("audio%2Fwebm"))
                : null
            }
            videoURL={
              Array.isArray(video.stream_urls)
                ? video.stream_urls.find((url) => url.includes("video%2Fwebm"))
                : null
            }
          />
        </Paper>
      ))}
    </Masonry>
  );
}
