import { Dimensions, Vector } from "../types";

interface RectangleOptions {
  fillStyle?: string;
  strokeStyle?: string;
}

export const rectangle = (
  context: CanvasRenderingContext2D,
  { x, y }: Vector,
  { w, h }: Dimensions,
  { fillStyle, strokeStyle }: RectangleOptions
): void => {
  if (typeof fillStyle !== "undefined") {
    context.fillStyle = fillStyle;
    context.fillRect(x, y, w, h);
  }

  if (typeof strokeStyle !== "undefined") {
    context.strokeStyle = strokeStyle;
    context.strokeRect(x, y, w, h);
  }
};
