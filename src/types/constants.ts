import { z } from "zod";
export const COMP_NAME = "MyComp";

export const DURATION_IN_FRAMES = 200;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;

export const WordSegment = z.object({
  word: z.string(),
  startTimeInSeconds: z.number(),
  endTimeInSeconds: z.number(),
});

export const CompositionProps = z.object({
  words: z.array(WordSegment),
  audioPath: z.string(),
  avatarVideoPath: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  words: [
    { word: "Hello,", startTimeInSeconds: 0, endTimeInSeconds: 0.5 },
    { word: "welcome", startTimeInSeconds: 0.5, endTimeInSeconds: 1.0 },
    { word: "to", startTimeInSeconds: 1.0, endTimeInSeconds: 1.2 },
    { word: "our", startTimeInSeconds: 1.2, endTimeInSeconds: 1.5 },
    { word: "first", startTimeInSeconds: 1.5, endTimeInSeconds: 2.0 },
    { word: "lesson!", startTimeInSeconds: 2.0, endTimeInSeconds: 3.0 },
    { word: "Today,", startTimeInSeconds: 3.0, endTimeInSeconds: 3.5 },
    { word: "we'll", startTimeInSeconds: 3.5, endTimeInSeconds: 4.0 },
    { word: "discuss", startTimeInSeconds: 4.0, endTimeInSeconds: 5.0 },
    { word: "Remotion.", startTimeInSeconds: 5.0, endTimeInSeconds: 6.0 },
  ],
  audioPath: "public/onyx_gpt-4o-mini-tts_1x_2025-04-26T08_47_17-490Z.wav",
  avatarVideoPath: "/placeholder-avatar.mp4",
};

export type MainCompProps = z.infer<typeof CompositionProps>;
