import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { Vector } from "./direction";
import { Dimensions } from "./intersection";

export type Box = Vector & Dimensions;

const SEGMENT_HEIGHT = SCREEN_HEIGHT / 3;
const SEGMENT_WIDTH = SCREEN_WIDTH / 3;

const createSegment = (position: Vector): Box => ({
  ...position,
  w: SEGMENT_WIDTH,
  h: SEGMENT_HEIGHT,
});

const SEGMENT_TL = createSegment({ x: 0, y: 0 });
const SEGMENT_TM = createSegment({ x: SEGMENT_WIDTH, y: 0 });
const SEGMENT_TR = createSegment({ x: SCREEN_WIDTH - SEGMENT_WIDTH, y: 0 });

const SEGMENT_ML = createSegment({ x: 0, y: SEGMENT_HEIGHT });
const SEGMENT_MR = createSegment({
  x: SCREEN_WIDTH - SEGMENT_WIDTH,
  y: SEGMENT_HEIGHT,
});

const SEGMENT_BL = createSegment({ x: 0, y: SCREEN_HEIGHT - SEGMENT_HEIGHT });
const SEGMENT_BM = createSegment({
  x: SEGMENT_WIDTH,
  y: SCREEN_HEIGHT - SEGMENT_HEIGHT,
});
const SEGMENT_BR = createSegment({
  x: SCREEN_WIDTH - SEGMENT_WIDTH,
  y: SCREEN_HEIGHT - SEGMENT_HEIGHT,
});

export const SEGMENTS: Box[] = [
  SEGMENT_TL,
  SEGMENT_TR,
  SEGMENT_BL,
  SEGMENT_BR,
  SEGMENT_ML,
  SEGMENT_MR,
  SEGMENT_TM,
  SEGMENT_BM,
];
