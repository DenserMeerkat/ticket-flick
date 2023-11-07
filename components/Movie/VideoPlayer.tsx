import React from "react";
import ReactPlayer, { YouTubeConfig } from "react-player/youtube";

interface YouTubePlayerProps {
  videoLink: string;
  isMuted: boolean;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoLink,
  isMuted,
}) => {
  const { videoId, startTime } = extractVideoIdAndStartTime(videoLink);

  function extractVideoIdAndStartTime(url: string) {
    let videoId = "";
    let startTime = "";

    // Check if the URL is in the format "https://youtu.be/VIDEO_ID?params"
    if (url.includes("youtu.be/")) {
      const parts = url.split("youtu.be/");
      videoId = parts[1].split("?")[0];
      const searchParams = new URLSearchParams(parts[1]);
      startTime = searchParams.get("t") || "";
    } else {
      // Check if the URL is in the format "https://www.youtube.com/watch?v=VIDEO_ID&params"
      if (url.includes("youtube.com/watch?v=")) {
        const parts = url.split("v=");
        videoId = parts[1].split("&")[0];
        const searchParams = new URLSearchParams(parts[1]);
        startTime = searchParams.get("t") || "";
      }
    }

    return { videoId, startTime };
  }

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const start = startTime ? parseInt(startTime, 10) : 0;

  const playerConfig: YouTubeConfig = {
    playerVars: { showInfo: 0 },
    embedOptions: {
      start: start,
      autoplay: 1,
      loop: 1,
      mute: isMuted,
    },
  };

  return (
    <ReactPlayer
      url={url}
      playing
      controls={false}
      loop
      muted={isMuted}
      volume={isMuted ? 0 : 1}
      config={playerConfig}
      width={"100%"}
      height={"100%"}
    />
  );
};

export default YouTubePlayer;
