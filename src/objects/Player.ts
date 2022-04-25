import {
  SCREEN_WIDTH,
  SPRITE_SIZE,
  SCREEN_HEIGHT,
  PLAYER_SPEED,
  PLAYER_DIAG_SPEED,
  PLAYER_START_POSITION,
  NEW_VECTOR,
} from "../constants";
import { Direction, getDirection, getHeading } from "../direction";
import { clamp } from "../helpers/math";
import { isDiag } from "../helpers/angle";
import { Dimensions, Vector } from "../types";
import { BulletControllerInstance } from "./Bullet";

import { rectangle } from "../helpers/draw";
import { enableDebug } from "../debug";
import { Player } from "./Player.types";
import { keys } from "../keys";
import { listenToEvents } from "../helpers/events";

export const CreatePlayer = (bullets: BulletControllerInstance): Player => {
  let nextFire = 0;

  let position: Vector = { ...PLAYER_START_POSITION };
  let heading: Vector = { ...NEW_VECTOR };
  let direction = Direction.LEFT;
  let strafe = false;
  let destroyed = false;

  const getPosition = (): Vector => position;
  const getSize = (): Dimensions => ({ w: SPRITE_SIZE, h: SPRITE_SIZE });
  const getBullets = () => bullets.getBullets();
  const isDestroyed = () => destroyed;

  const setDestroyed = () => {
    destroyed = true;
  };

  listenToEvents(["keydown", "keyup"], () => {
    // check x
    if (!keys["ArrowLeft"] && !keys["ArrowRight"]) {
      move({ x: 0 });
    } else if (keys["ArrowLeft"] && !keys["ArrowRight"]) {
      move({ x: -1 });
    } else if (keys["ArrowRight"] && !keys["ArrowLeft"]) {
      move({ x: 1 });
    }
    // check y
    if (!keys["ArrowUp"] && !keys["ArrowDown"]) {
      move({ y: 0 });
    } else if (keys["ArrowUp"] && !keys["ArrowDown"]) {
      move({ y: -1 });
    } else if (keys["ArrowDown"] && !keys["ArrowUp"]) {
      move({ y: 1 });
    }

    setStrafe(keys["Shift"]);
  });

  const update = () => {
    const speed = isDiag(heading) ? PLAYER_DIAG_SPEED : PLAYER_SPEED;

    position.x = clamp(
      position.x + heading.x * speed,
      0,
      SCREEN_WIDTH - SPRITE_SIZE
    );
    position.y = clamp(
      position.y + heading.y * speed,
      0,
      SCREEN_HEIGHT - SPRITE_SIZE
    );

    fire();
  };

  const fire = () => {
    if (nextFire > 0) {
      nextFire--;
      return;
    }

    nextFire = 5;

    bullets.fire(
      { x: position.x + SPRITE_SIZE / 2, y: position.y + SPRITE_SIZE / 2 },
      getHeading(direction)
    );
  };

  const draw = () => {
    rectangle(
      position,
      { w: SPRITE_SIZE, h: SPRITE_SIZE },
      { fillStyle: "gold" }
    );
    bullets.draw();
  };

  const setDirection = () => {
    const newDirection = getDirection(heading);

    if (typeof newDirection !== "undefined" && newDirection !== direction) {
      direction = newDirection;
    }
  };

  const setStrafe: Player["setStrafe"] = (newStrafe) => {
    strafe = newStrafe;
  };

  const move: Player["move"] = ({ x, y }) => {
    if (x === heading.x && y === heading.y) {
      return;
    }
    if (typeof x !== "undefined") {
      heading.x = x;
    }

    if (typeof y !== "undefined") {
      heading.y = y;
    }

    if (!strafe) {
      setDirection();
    }
  };

  const reset = () => {
    nextFire = 0;

    position = { ...PLAYER_START_POSITION };
    heading = { ...NEW_VECTOR };
    direction = Direction.LEFT;
    strafe = false;
    destroyed = false;

    bullets.reset();
  };

  return {
    update,
    draw,
    move,
    setStrafe,
    getPosition,
    getSize,
    fire,
    getBullets,
    reset,
    setDestroyed,
    isDestroyed,
    debug: enableDebug
      ? { get: () => ({ direction, position, heading }), setDirection }
      : {},
  };
};
