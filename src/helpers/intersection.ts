import { Vector, Dimensions, Box } from "../types";

type LineRect = (
  lineStart: Vector,
  lineEnd: Vector,
  rectPos: Vector,
  rectSize: Dimensions
) => boolean;

const lineRect: LineRect = (
  lineStart: Vector,
  lineEnd: Vector,
  { x: rx, y: ry }: Vector,
  { w: rw, h: rh }: Dimensions
): boolean => {
  if (lineLine(lineStart, lineEnd, { x: rx, y: ry }, { x: rx, y: ry + rh })) {
    return true;
  }

  if (lineLine(lineStart, lineEnd, { x: rx, y: ry }, { x: rx + rw, y: ry })) {
    return true;
  }

  if (
    lineLine(
      lineStart,
      lineEnd,
      { x: rx + rw, y: ry },
      { x: rx + rw, y: ry + rh }
    )
  ) {
    return true;
  }

  if (
    lineLine(
      lineStart,
      lineEnd,
      { x: rx, y: ry + rh },
      { x: rx + rw, y: ry + rh }
    )
  ) {
    return true;
  }

  return false;
};

type LineLine = (
  line1: Vector,
  line2: Vector,
  line3: Vector,
  line4: Vector
) => boolean;

const lineLine: LineLine = (
  { x: x1, y: y1 },
  { x: x2, y: y2 },
  { x: x3, y: y3 },
  { x: x4, y: y4 }
): boolean => {
  const uA =
    ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  const uB =
    ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
};

type RectRect = (rect1: Box, rect2: Box) => boolean;

const rectRect: RectRect = (
  { x: r1x, y: r1y, w: r1w, h: r1h },
  { x: r2x, y: r2y, w: r2w, h: r2h }
) =>
  r1x + r1w >= r2x && r1x <= r2x + r2w && r1y + r1h >= r2y && r1y <= r2y + r2h;

export const intersects = { lineRect, lineLine, rectRect };
