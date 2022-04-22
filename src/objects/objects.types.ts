import { Dimensions, Vector } from "../types";
import { Bullet } from "./Bullet";

export interface Entity {
  isDestroyed: () => boolean;
  setDestroyed: () => void;
  getPosition: () => Vector;
  getSize: () => Dimensions;
  update: () => void;
  draw: () => void;
  reset: () => void;
  debug: Record<string, () => void>;
}

export interface CanFire {
  fire: () => void;
  getBullets: () => Bullet[];
}
