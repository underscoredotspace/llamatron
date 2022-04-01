const diag = (value: number): number => Math.sqrt(Math.pow(value, 2) / 2);

export const SPRITE_SIZE = 16;
export const SCREEN_WIDTH = 640;
export const SCREEN_HEIGHT = 400;

export const PLAYER_SPEED = 1.5;
export const PLAYER_DIAG_SPEED = diag(PLAYER_SPEED);

export const PLAYER_BULLET_SPEED = PLAYER_SPEED * 2;
export const PLAYER_BULLET_DIAG_SPEED = diag(PLAYER_BULLET_SPEED);

export const PLAYER_BULLET_LENGTH = 10;
export const PLAYER_BULLET_DIAG_LENGTH = diag(PLAYER_BULLET_LENGTH);
