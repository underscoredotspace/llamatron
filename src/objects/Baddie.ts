import { NEW_VECTOR, PLAYER_BULLET_LENGTH, SPRITE_SIZE } from "../constants";
import {
  getHeading,
  getLineEnd,
  getRelativeDirection,
  Vector,
} from "../direction";
import { random } from "../helpers";
import { intersects } from "../intersection";
import { Player } from "./Player";

const BOX_SIZE = { w: SPRITE_SIZE, h: SPRITE_SIZE };

export const BaddieController = (
  context: CanvasRenderingContext2D,
  startPosition: Vector
) => {
  let position: Vector = { ...startPosition };
  let heading: Vector = { ...NEW_VECTOR };
  let lastMoveTime = 0;
  const moveTimeOffset = random(0, 10);
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
    context.restore();
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

  const checkIntersection = (player: Player) => {
    const bullets = player.getBullets();

    bullets.forEach((bullet) => {
      const bulletEnd = getLineEnd(
        bullet.position,
        bullet.heading,
        PLAYER_BULLET_LENGTH
      );

      if (
        intersects.lineRect(bullet.position, bulletEnd, position, {
          w: SPRITE_SIZE,
          h: SPRITE_SIZE,
        })
      ) {
        dead = true;
        bullet.setSpent();
      }

      if (
        intersects.rectRect(
          { ...position, ...BOX_SIZE },
          { ...player.getPosition(), ...BOX_SIZE }
        )
      ) {
        player.setDead();
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
