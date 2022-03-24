import { SCREEN_WIDTH, SPRITE_SIZE, SCREEN_HEIGHT } from "../constants";

export const Player = (context: CanvasRenderingContext2D) => {
  const STARTING_X = SCREEN_WIDTH / 2 - SPRITE_SIZE / 2;
  const STARTING_Y = SCREEN_HEIGHT / 2 - SPRITE_SIZE / 2;

  let xPos = STARTING_X;
  let yPos = STARTING_Y;

  const draw = () => {
    context.fillRect(xPos, yPos, SPRITE_SIZE, SPRITE_SIZE);
  };

  const move = (x = 0, y = 0) => {
    const newX = xPos + x;
    const newY = yPos + y;

    if (newX > 0 && newX < SCREEN_WIDTH - SPRITE_SIZE) {
      xPos = newX;
    }

    if (newY > 0 && newY < SCREEN_HEIGHT - SPRITE_SIZE) {
      yPos = newY;
    }
  };

  return {
    draw,
    move,
  };
};
