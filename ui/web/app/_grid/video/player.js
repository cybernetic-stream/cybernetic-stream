"use client";
import React, { useEffect, useRef, useState } from "react";
import { Player as VideoReactPlayer } from "video-react";
import "video-react/dist/video-react.css";

export default function Player({ videoURL, audioURL }) {
  const [autoPlay, setAutoPlay] = useState(false);
  const [muted, setMuted] = useState(true);
  const playerRef = useRef(null);
  const audioRef = useRef(null);
  const visibilityRef = useRef(null);

  //  useEffect(() => {
  //    const observer = new IntersectionObserver(
  //      (entries) => {
  //        const entry = entries[0];
  //        const player = playerRef.current;
  //
  //        if (entry.isIntersecting) {
  //          player?.play();
  //        } else if (player && !player.paused && player.readyState > 2) {
  //          player.pause();
  //        }
  //      },
  //      { threshold: 0.5 },
  //    );
  //
  //    const element = visibilityRef.current;
  //    if (element) {
  //      observer.observe(element);
  //    }
  //
  //    return () => {
  //      if (element) {
  //        observer.unobserve(element);
  //      }
  //    };
  //  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const player = playerRef.current;

    if (audio && player) {
      const playerState = player.getState().player;
      audio.currentTime = playerState.currentTime;

      if (!muted) {
        audio.play().catch((e) => console.error("Error playing audio:", e));
      }
    } else if (audio) {
      audio.pause();
    }

    audio.muted = muted;
  }, [muted]);

  return (
    <>
      <div
        ref={visibilityRef}
        style={
          muted
            ? { border: "1px solid black" }
            : { border: "1px solid #AC9DF8" }
        }
      >
        <VideoReactPlayer
          ref={playerRef}
          src={videoURL}
          preload
          autoPlay={false}
          muted={true}
          loop
          onClick={() => setMuted((prev) => !prev)}
          aspectRatio="16:9"
        />
      </div>
      <audio ref={audioRef} src={audioURL} loop hidden />
    </>
  );
}
