import { Vector } from "../types";
import { Entity } from "./objects.types";

export interface Baddie extends Entity {
  setHeading: (towards: Vector) => void;
}
