import {
  SCREEN_WIDTH,
  SPRITE_SIZE,
  SCREEN_HEIGHT,
  PLAYER_SPEED,
  PLAYER_DIAG_SPEED,
} from "../constants";
import { Direction, getDirection, getHeading, Vector } from "../direction";
import { clamp } from "../helpers";
import { BulletController } from "./Bullet";
import { Move } from "./Player.types";

const STARTING_X = SCREEN_WIDTH / 2 - SPRITE_SIZE / 2;
const STARTING_Y = SCREEN_HEIGHT / 2 - SPRITE_SIZE / 2;

export const Player = (context: CanvasRenderingContext2D) => {
  const bullets = BulletController(context);

  let nextFire = 0;

  let xPos = STARTING_X;
  let yPos = STARTING_Y;
  let xHead = 0;
  let yHead = 0;
  let direction = Direction.LEFT;
  let hold = false;

  const isHeadDiag = () => xHead !== 0 && yHead !== 0;

  const getPosition = (): Vector => ({ x: xPos, y: yPos });

  const update = () => {
    let speed = isHeadDiag() ? PLAYER_DIAG_SPEED : PLAYER_SPEED;

    xPos = clamp(xPos + xHead * speed, 0, SCREEN_WIDTH - SPRITE_SIZE);
    yPos = clamp(yPos + yHead * speed, 0, SCREEN_HEIGHT - SPRITE_SIZE);

    fire();
  };

  const fire = () => {
    if (nextFire > 0) {
      nextFire--;
      return;
    }

    nextFire = 15;

    const { x, y } = getHeading(direction);
    bullets.fire(xPos + SPRITE_SIZE / 2, yPos + SPRITE_SIZE / 2, x, y);
  };

  const draw = () => {
    context.fillStyle = "gold";
    context.fillRect(xPos, yPos, SPRITE_SIZE, SPRITE_SIZE);
    bullets.draw();
  };

  const setDirection = () => {
    const newDirection = getDirection(xHead, yHead);

    if (typeof newDirection !== "undefined" && newDirection !== direction) {
      direction = newDirection;
    }
  };

  const setHold = (shouldHold: boolean) => {
    hold = shouldHold;
  };

  const move: Move = ({ x, y }) => {
    if (x === xHead && y === yHead) {
      return;
    }
    if (typeof x !== "undefined") {
      xHead = x;
    }

    if (typeof y !== "undefined") {
      yHead = y;
    }

    if (!hold) {
      setDirection();
    }
  };

  const _v = () => ({
    xPos,
    yPos,
    xHead,
    yHead,
    direction,
  });

  return {
    update,
    draw,
    move,
    setHold,
    getPosition,
    _v,
    _f: {
      setDirection,
    },
  };
};
