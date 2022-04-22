import { Vector } from "../types";
import { Entity } from "./objects.types";
import { Player } from "./Player.types";

export interface Baddie extends Entity {
  setHeading: (towards: Vector) => void;
  checkIntersection: (player: Player) => void;
}
