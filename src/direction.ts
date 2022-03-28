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
