import {
  SCREEN_WIDTH,
  SPRITE_SIZE,
  SCREEN_HEIGHT,
  PLAYER_SPEED,
  PLAYER_DIAG_SPEED,
} from "../constants";
import { Direction, getDirection, getHeading } from "../direction";
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

  const update = () => {
    fire();
    if (nextFire > 0) nextFire--;
    let speed = xHead !== 0 && yHead !== 0 ? PLAYER_DIAG_SPEED : PLAYER_SPEED;

    xPos = clamp(xPos + xHead * speed, 0, SCREEN_WIDTH - SPRITE_SIZE);
    yPos = clamp(yPos + yHead * speed, 0, SCREEN_HEIGHT - SPRITE_SIZE);
  };

  const fire = () => {
    if (nextFire > 0) return;

    nextFire = 15;

    const { x, y } = getHeading(direction);
    bullets.fire(xPos + SPRITE_SIZE / 2, yPos + SPRITE_SIZE / 2, x, y);
  };

  const draw = () => {
    bullets.draw();
    setDirection();
    update();
    context.fillStyle = "gold";
    context.fillRect(xPos, yPos, SPRITE_SIZE, SPRITE_SIZE);
  };

  const setDirection = () => {
    const newDirection = getDirection(xHead, yHead);

    if (typeof newDirection !== "undefined" && newDirection !== direction) {
      direction = newDirection;
    }
  };

  const move: Move = ({ x, y }) => {
    if (typeof x !== "undefined") {
      xHead = x;
    }

    if (typeof y !== "undefined") {
      yHead = y;
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
    draw,
    move,
    _v,
    _f: {
      update,
      setDirection,
    },
  };
};
