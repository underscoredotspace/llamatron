import { SCREEN_WIDTH, SPRITE_SIZE, SCREEN_HEIGHT } from "../constants";

const STARTING_X = SCREEN_WIDTH / 2 - SPRITE_SIZE / 2;
const STARTING_Y = SCREEN_HEIGHT / 2 - SPRITE_SIZE / 2;

export const Player = (context: CanvasRenderingContext2D) => {
  let xPos = STARTING_X;
  let yPos = STARTING_Y;

  const draw = () => {
    context.fillStyle = "gold";
    context.fillRect(xPos, yPos, SPRITE_SIZE, SPRITE_SIZE);
  };

  const move = (x = 0, y = 0) => {
    const newX = xPos + (x && y ? x / 2 : x);
    const newY = yPos + (x && y ? y / 2 : y);

    if (newX <= 0) {
      xPos = 0;
    } else if (newX >= SCREEN_WIDTH - SPRITE_SIZE) {
      xPos = SCREEN_WIDTH - SPRITE_SIZE;
    } else {
      xPos = newX;
    }

    if (newY <= 0) {
      yPos = 0;
    } else if (newY >= SCREEN_HEIGHT - SPRITE_SIZE) {
      yPos = SCREEN_HEIGHT - SPRITE_SIZE;
    } else {
      yPos = newY;
    }
  };

  return {
    draw,
    move,
  };
};
