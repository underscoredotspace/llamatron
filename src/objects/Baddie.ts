import { NEW_VECTOR, PLAYER_BULLET_LENGTH, SPRITE_SIZE } from "../constants";
import {
  getHeading,
  getLineEnd,
  getRelativeDirection,
  Vector,
} from "../direction";
import { random } from "../helpers";
import { Bullet } from "./Bullet";

export const BaddieController = (
  context: CanvasRenderingContext2D,
  startPosition: Vector
) => {
  let position: Vector = { ...startPosition };
  let heading: Vector = { ...NEW_VECTOR };
  let lastMoveTime = 0;
  let moveTimeOffset = random(0, 10);
  let dead = false;

  const move = () => {
    if (lastMoveTime > 0) {
      lastMoveTime--;
      return;
    }

    lastMoveTime = 5 + moveTimeOffset;
    position.x += heading.x;
    position.y += heading.y;
  };

  const draw = () => {
    context.fillStyle = "blue";
    context.fillRect(position.x, position.y, SPRITE_SIZE, SPRITE_SIZE);
  };

  const setHeading = (playerPosition: Vector) => {
    const direction = getRelativeDirection(position, playerPosition);
    heading = getHeading(direction);
  };

  const reset = () => {
    position = { ...startPosition };
    heading = { ...NEW_VECTOR };
  };

  const checkIntersection = (bullets: Bullet[]) => {
    const top = position.y;
    const left = position.x;
    const bottom = top + SPRITE_SIZE;
    const right = left + SPRITE_SIZE;

    bullets.forEach((bullet) => {
      const bulletEnd = getLineEnd(
        bullet.position,
        bullet.heading,
        PLAYER_BULLET_LENGTH
      );

      if (
        (bulletEnd.x > left &&
          bulletEnd.x < right &&
          bulletEnd.y > top &&
          bulletEnd.y < bottom) ||
        (bullet.position.x > left &&
          bullet.position.x < right &&
          bullet.position.y > top &&
          bullet.position.y < bottom)
      ) {
        console.log("a baddie is dead");
        dead = true;
      }
    });
  };

  const isAlive = () => !dead;

  return {
    move,
    draw,
    setHeading,
    reset,
    checkIntersection,
    isAlive,
  };
};

export type BaddieType = ReturnType<typeof BaddieController>;
