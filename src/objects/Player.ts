import { SCREEN_WIDTH, SPRITE_SIZE, SCREEN_HEIGHT, SPEED } from "../constants";
import { clamp } from "../helpers";

const STARTING_X = SCREEN_WIDTH / 2 - SPRITE_SIZE / 2;
const STARTING_Y = SCREEN_HEIGHT / 2 - SPRITE_SIZE / 2;

export enum Direction {
  UP = 0,
  UPRIGHT = 45,
  RIGHT = 90,
  DOWNRIGHT = 135,
  DOWN = 180,
  DOWNLEFT = 225,
  LEFT = 270,
  UPLEFT = 315,
}

export const DirectionMap = [
  [Direction.UPLEFT, Direction.UP, Direction.UPRIGHT],
  [Direction.LEFT, undefined, Direction.RIGHT],
  [Direction.DOWNLEFT, Direction.DOWN, Direction.DOWNRIGHT],
];

const getDirection = (x: number, y: number): Direction | undefined =>
  DirectionMap[y + 1][x + 1];

export const Player = (context: CanvasRenderingContext2D) => {
  interface MoveProps {
    x?: number;
    y?: number;
  }

  type Move = (p: MoveProps) => void;

  let xPos = STARTING_X;
  let yPos = STARTING_Y;
  let xHead = 0;
  let yHead = 0;
  let direction = Direction.LEFT;

  const update = () => {
    xPos = clamp(xPos + xHead * SPEED, 0, SCREEN_WIDTH - SPRITE_SIZE);
    yPos = clamp(yPos + yHead * SPEED, 0, SCREEN_HEIGHT - SPRITE_SIZE);
  };

  const draw = () => {
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
