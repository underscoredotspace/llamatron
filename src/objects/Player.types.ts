import { CanFire, Entity } from "./objects.types";

interface MoveProps {
  x?: number;
  y?: number;
}

type PlayerEntity = Entity & CanFire;

export interface Player extends PlayerEntity {
  move: (p: MoveProps) => void;
  setStrafe: (strafe: boolean) => void;
}
