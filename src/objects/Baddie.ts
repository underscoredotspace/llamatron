import { NEW_VECTOR, SPRITE_SIZE } from "../constants";
import { getHeading, getRelativeDirection } from "../direction";
import { random } from "../helpers/math";
import { Vector } from "../types";
import { Baddie } from "./Baddie.types";
import { enableDebug } from "../debug";
import { rectangle } from "../helpers/draw";

export const CreateBaddie = (startPosition: Vector): Baddie => {
  let position: Vector = { ...startPosition };
  let heading: Vector = { ...NEW_VECTOR };
  let lastMoveTime = 0;
  let destroyed = false;
  const moveTimeOffset = random(0, 10);

  const getSize = () => ({ w: SPRITE_SIZE, h: SPRITE_SIZE });
  const getPosition = () => position;

  const update = () => {
    if (lastMoveTime > 0) {
      lastMoveTime--;
      return;
    }

    lastMoveTime = 3 + moveTimeOffset;
    position.x += heading.x;
    position.y += heading.y;
  };

  const draw = () => {
    rectangle(position, getSize(), { fillStyle: "blue" });
  };

  const setHeading = (playerPosition: Vector) => {
    const direction = getRelativeDirection(position, playerPosition);
    heading = getHeading(direction);
  };

  const reset = () => {
    position = { ...startPosition };
    heading = { ...NEW_VECTOR };
  };

  const setDestroyed = () => {
    destroyed = true;
  };
  const isDestroyed = () => destroyed;

  return {
    update,
    draw,
    getPosition,
    setHeading,
    getSize,
    reset,
    isDestroyed,
    setDestroyed,
    debug: enableDebug ? { get: () => ({}) } : {},
  };
};
