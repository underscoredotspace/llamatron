import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants";
import { getScreen } from "../screen";
import { Dimensions, Vector } from "../types";

interface StyleOptions {
  fillStyle?: string;
  strokeStyle?: string;
}

type RectangleOptions = StyleOptions;
type LineOptions = Omit<StyleOptions, "fillStyle">;

const context = getScreen().context;

export const rectangle = (
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

export const line = (
  start: Vector,
  end: Vector,
  { strokeStyle }: LineOptions = {}
) => {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.strokeStyle = strokeStyle ?? "";
  context.stroke();
  context.closePath();
};

export const clearScreen = () =>
  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
