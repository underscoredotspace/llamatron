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

const DIRECTIONS = [
  Direction.UP,
  Direction.UPRIGHT,
  Direction.RIGHT,
  Direction.DOWNRIGHT,
  Direction.DOWN,
  Direction.DOWNLEFT,
  Direction.LEFT,
  Direction.UPLEFT,
];

export const DirectionMap = [
  [Direction.UPLEFT, Direction.UP, Direction.UPRIGHT],
  [Direction.LEFT, undefined, Direction.RIGHT],
  [Direction.DOWNLEFT, Direction.DOWN, Direction.DOWNRIGHT],
];

export const getDirection = (heading: Vector): Direction | undefined =>
  DirectionMap[Math.floor(heading.y) + 1][Math.floor(heading.x) + 1];

export interface Vector {
  x: number;
  y: number;
}

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

export const toDeg = (rad: number) => {
  const deg = (rad * 180) / Math.PI - 90;

  if (deg >= 360) {
    return deg - 360;
  }

  if (deg < 0) {
    return deg + 360;
  }

  return deg;
};

export const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

// Returns vector2's angle relative to vector1
export const getRelativeAngle = (vector1: Vector, vector2: Vector): number => {
  const dx = vector1.x - vector2.x;
  const dy = vector1.y - vector2.y;

  const rad = Math.atan2(dy, dx);
  return Math.floor(toDeg(rad));
};

export const getRelativeDirection = (
  vector1: Vector,
  vector2: Vector
): Direction => {
  const relativeAngle = getRelativeAngle(vector1, vector2);
  const roundedAngle = Math.round(relativeAngle / 45);

  return DIRECTIONS[roundedAngle === 8 ? 0 : roundedAngle];
};

export const getLineEnd = (
  start: Vector,
  heading: Vector,
  length: number
): Vector => {
  const direction = getDirection(heading);
  if (typeof direction === "undefined") {
    return start;
  }

  const angle = toRad(direction);
  const y = start.y + length * Math.sin(angle);
  const x = start.x + length * Math.cos(angle);

  return { x, y };
};

export const isDiag = (vector: Vector) => vector.x !== 0 && vector.y !== 0;
