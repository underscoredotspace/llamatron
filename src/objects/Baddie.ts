import { NEW_VECTOR, PLAYER_BULLET_LENGTH, SPRITE_SIZE } from "../constants";
import { getHeading, getLineEnd, getRelativeDirection } from "../direction";
import { random } from "../helpers/math";
import { intersects } from "../helpers/intersection";
import { Vector } from "../types";
import { Player } from "./Player.types";
import { Baddie } from "./Baddie.types";
import { enableDebug } from "../debug";
import { rectangle } from "../helpers/draw";

const BOX_SIZE = { w: SPRITE_SIZE, h: SPRITE_SIZE };

export const CreateBaddie = (
  context: CanvasRenderingContext2D,
  startPosition: Vector
): Baddie => {
  let position: Vector = { ...startPosition };
  let heading: Vector = { ...NEW_VECTOR };
  let lastMoveTime = 0;
  const moveTimeOffset = random(0, 10);
  let destroyed = false;

  const getSize = () => ({ w: SPRITE_SIZE, h: SPRITE_SIZE });
  const getPosition = () => position;

  const update = () => {
    if (lastMoveTime > 0) {
      lastMoveTime--;
      return;
    }

    lastMoveTime = 5 + moveTimeOffset;
    position.x += heading.x;
    position.y += heading.y;
  };

  const draw = () => {
    rectangle(context, position, getSize(), { fillStyle: "blue" });
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
    player.getBullets().forEach((bullet) => {
      const bulletEnd = getLineEnd(
        bullet.position,
        bullet.heading,
        PLAYER_BULLET_LENGTH
      );

      // player's bullet has hit baddie
      if (
        intersects.lineRect(
          bullet.position,
          bulletEnd,
          position,
          player.getSize()
        )
      ) {
        destroyed = true;
        bullet.setSpent();
      }

      // baddie has hit player
      if (
        intersects.rectRect(
          { ...position, ...BOX_SIZE },
          { ...player.getPosition(), ...player.getSize() }
        )
      ) {
        player.setDestroyed();
      }
    });
  };

  const setDestroyed = () => undefined;
  const isDestroyed = () => destroyed;

  return {
    update,
    draw,
    getPosition,
    setHeading,
    getSize,
    reset,
    checkIntersection,
    isDestroyed,
    setDestroyed,
    debug: enableDebug ? { get: () => ({}) } : {},
  };
};
