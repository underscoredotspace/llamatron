export interface Vector {
  x: number;
  y: number;
}

export interface Dimensions {
  w: number;
  h: number;
}

export type Box = Vector & Dimensions;
