import React, { useState } from "react";
import YouTube from "react-youtube";

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
    const urlParams = new URLSearchParams(new URL(url).search);

    const videoId = urlParams.get("v") || urlParams.get("video_id");
    const startTime = urlParams.get("start");

    return { videoId, startTime };
  }

  const opts: any = {
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      loop: 1,
      mute: isMuted ? 1 : 0,
      start: startTime ? parseInt(startTime, 10) : 0,
    },
  };

  return (
    <div className="w-full">
      <YouTube
        className="aspect-w-16 aspect-h-9"
        videoId={videoId!}
        opts={opts}
      />
    </div>
  );
};

export default YouTubePlayer;
