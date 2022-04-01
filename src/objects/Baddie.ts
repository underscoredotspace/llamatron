import { SPRITE_SIZE } from "../constants";
import { getHeading, getRelativeDirection, Vector } from "../direction";

export const Baddie = (
  context: CanvasRenderingContext2D,
  startPosition: Vector
) => {
  const position = startPosition;
  let heading: Vector = { x: 0, y: 0 };
  let lastMove = 0;

  const move = () => {
    if (lastMove > 0) {
      lastMove--;
      return;
    }

    lastMove = 5;
    position.x += heading.x;
    position.y += heading.y;
  };

  const draw = () => {
    move();
    context.fillStyle = "blue";
    context.fillRect(position.x, position.y, SPRITE_SIZE, SPRITE_SIZE);
  };

  const setHeading = (playerPosition: Vector) => {
    const direction = getRelativeDirection(position, playerPosition);
    heading = getHeading(direction);
  };

  return {
    draw,
    setHeading,
  };
};

export type BaddieType = ReturnType<typeof Baddie>;
