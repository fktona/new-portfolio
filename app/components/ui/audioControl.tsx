import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useLandingCtx } from "../../context/landingCtx";

const AnimatedAudioLine = ({ isPlaying }: { isPlaying: boolean }) => {
  const [heights, setHeights] = useState([3, 7, 5, 9, 6, 8]);

  useEffect(() => {
    const animateLines = () => {
      setHeights((prevHeights) =>
        prevHeights.map(() => Math.floor(Math.random() * 7) + 3)
      );
    };

    const interval = setInterval(animateLines, 150);
    !isPlaying && clearInterval(interval);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <svg width="24" height="16" viewBox="0 0 24 16" className="text-blue-500">
      {heights.map((height, index) => (
        <rect
          key={index}
          x={index * 4}
          y={16 - height}
          width="3"
          height={height}
          fill="white"
          className="transition-all duration-150 ease-in-out"
        />
      ))}
    </svg>
  );
};

AnimatedAudioLine.displayName = "AnimatedAudioLine";

const MiniAudioPlayer = () => {
  const { isPlaying, setIsPlaying } = useLandingCtx();

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className=" relative bg-primaryBlue/25 shadow-lg rounded-full p-1 justify-between flex items-center space-x-2">
      {/* <button className="text-gray-600 hover:text-gray-800 transition-colors">
        <SkipBack size={16} />
      </button> */}
      <button
        className="bg-primaryBlue text-white rounded-full p-1 hover:bg-primaryBlue/70 active:scale-95 transition-colors"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      {/* <button className="text-gray-600 hover:text-gray-800 transition-colors">
        <SkipForward size={16} />
      </button> */}
      <div className="">
        <AnimatedAudioLine isPlaying={isPlaying} />
      </div>
    </div>
  );
};

export default MiniAudioPlayer;
