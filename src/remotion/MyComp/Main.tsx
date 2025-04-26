import { z } from "zod";
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React from "react";
import { MainCompProps } from "../../types/constants";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "700"],
});

const containerStyle: React.CSSProperties = {
  backgroundColor: "black",
  position: "relative",
};

const textContainerStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  textAlign: "center",
  zIndex: 10,
};

const wordStyle: React.CSSProperties = {
  fontFamily,
  fontSize: 60,
  color: "white",
  display: "inline-block",
  margin: "0 5px",
};

const highlightedWordStyle: React.CSSProperties = {
  ...wordStyle,
  color: "#00AAFF",
  fontWeight: "bold",
  textShadow: "0 0 10px rgba(0, 170, 255, 0.7)",
};

const avatarStyle: React.CSSProperties = {
  position: "absolute",
  width: "25%",
  height: "auto",
  bottom: "10px",
  right: "10px",
  zIndex: 20,
  borderRadius: "10px",
  border: "3px solid white",
};

export const Main: React.FC<MainCompProps> = ({
  words,
  audioPath,
  avatarVideoPath,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const currentTimeInSeconds = frame / fps;

  // Find the current active word
  const activeWordIndex = words.findIndex(
    (word) =>
      currentTimeInSeconds >= word.startTimeInSeconds &&
      currentTimeInSeconds < word.endTimeInSeconds
  );

  
  return (
    <AbsoluteFill style={containerStyle}>
      {/* Text display with word highlighting */}
      <div style={textContainerStyle}>
        {words.map((word, index) => {
          const isActive = index === activeWordIndex;
          return (
            <span 
              key={`${word.word}-${index}`} 
              style={isActive ? highlightedWordStyle : wordStyle}
            >
              {word.word}
            </span>
          );
        })}
      </div>

      {/* Avatar video */}
      {avatarVideoPath && (
        <Video 
          src={avatarVideoPath} 
          style={avatarStyle} 
          startFrom={0} 
          endAt={durationInFrames} 
        />
      )}

      {/* Audio narration */}
      {audioPath && <Audio src={audioPath} startFrom={0} endAt={durationInFrames} />}
    </AbsoluteFill>
  );
};
