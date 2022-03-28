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

export const getDirection = (x: number, y: number): Direction | undefined =>
  DirectionMap[y + 1][x + 1];

type Vector = {
  x: number;
  y: number;
};

interface Headings {
  [direction: number]: Vector;
}

const HEADINGS: Headings = {
  [Direction.UP]: { x: 0, y: -1 },
  [Direction.UPRIGHT]: { x: 1, y: -1 },
  [Direction.RIGHT]: { x: 1, y: 0 },
  [Direction.DOWNRIGHT]: { x: 1, y: 1 },
  [Direction.DOWN]: { x: 0, y: 1 },
  [Direction.DOWNLEFT]: { x: -1, y: 1 },
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.UPLEFT]: { x: -1, y: -1 },
};

export const getHeading = (direction: Direction): Vector => HEADINGS[direction];
