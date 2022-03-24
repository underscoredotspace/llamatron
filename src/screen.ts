import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./constants";

export const getScreen = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#main");
  if (!canvas) {
    throw 1;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    throw 1;
  }

  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;

  return { canvas, context };
};
