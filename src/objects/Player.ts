import {
  SCREEN_WIDTH,
  SPRITE_SIZE,
  SCREEN_HEIGHT,
  PLAYER_SPEED,
  PLAYER_DIAG_SPEED,
  PLAYER_START_POSITION,
  NEW_VECTOR,
} from "../constants";
import {
  Direction,
  getDirection,
  getHeading,
  isDiag,
  Vector,
} from "../direction";
import { clamp } from "../helpers";
import { BulletControllerInstance } from "./Bullet";
import { Move } from "./Player.types";

export const Player = (
  context: CanvasRenderingContext2D,
  bullets: BulletControllerInstance
) => {
  let nextFire = 0;

  let position: Vector = { ...PLAYER_START_POSITION };
  let heading: Vector = { ...NEW_VECTOR };
  let direction = Direction.LEFT;
  let hold = false;

  const getPosition = (): Vector => position;
  const getBullets = () => bullets.getBullets();

  const update = () => {
    let speed = isDiag(heading) ? PLAYER_DIAG_SPEED : PLAYER_SPEED;

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

    nextFire = 15;

    bullets.fire(
      { x: position.x + SPRITE_SIZE / 2, y: position.y + SPRITE_SIZE / 2 },
      getHeading(direction)
    );
  };

  const draw = () => {
    context.fillStyle = "gold";
    context.fillRect(position.x, position.y, SPRITE_SIZE, SPRITE_SIZE);
    bullets.draw();
  };

  const setDirection = () => {
    const newDirection = getDirection(heading);

    if (typeof newDirection !== "undefined" && newDirection !== direction) {
      direction = newDirection;
    }
  };

  const setHold = (shouldHold: boolean) => {
    hold = shouldHold;
  };

  const move: Move = ({ x, y }) => {
    if (x === heading.x && y === heading.y) {
      return;
    }
    if (typeof x !== "undefined") {
      heading.x = x;
    }

    if (typeof y !== "undefined") {
      heading.y = y;
    }

    if (!hold) {
      setDirection();
    }
  };

  const reset = () => {
    nextFire = 0;

    position = { ...PLAYER_START_POSITION };
    heading = { ...NEW_VECTOR };
    direction = Direction.LEFT;
    hold = false;

    bullets.reset();
  };

  const _v = () => ({
    position,
    heading,
    direction,
  });

  return {
    update,
    draw,
    move,
    setHold,
    getPosition,
    getBullets,
    reset,
    _v,
    _f: {
      setDirection,
    },
  };
};
