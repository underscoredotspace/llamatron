import { Vector } from "./types";

const diag = (value: number): number => Math.sqrt(Math.pow(value, 2) / 2);

export const SPRITE_SIZE = 16;
export const SCREEN_WIDTH = 640;
export const SCREEN_HEIGHT = 400;

export const PLAYER_SPEED = 1.5;
export const PLAYER_DIAG_SPEED = diag(PLAYER_SPEED);

export const PLAYER_BULLET_SPEED = PLAYER_SPEED * 4;
export const PLAYER_BULLET_DIAG_SPEED = diag(PLAYER_BULLET_SPEED);

export const PLAYER_START_POSITION: Vector = {
  x: SCREEN_WIDTH / 2 - SPRITE_SIZE / 2,
  y: SCREEN_HEIGHT / 2 - SPRITE_SIZE / 2,
};

export const PLAYER_BULLET_LENGTH = 10;
export const PLAYER_BULLET_DIAG_LENGTH = diag(PLAYER_BULLET_LENGTH);
export const PLAYER_BULLET_COLOR = "red";

export const NEW_VECTOR = { x: 0, y: 0 };
