import { Vector } from "../types";

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

export const isDiag = (vector: Vector) => vector.x !== 0 && vector.y !== 0;
