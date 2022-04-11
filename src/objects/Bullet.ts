import {
  PLAYER_BULLET_COLOR,
  PLAYER_BULLET_DIAG_SPEED,
  PLAYER_BULLET_LENGTH,
  PLAYER_BULLET_SPEED,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../constants";
import { getLineEnd, isDiag, Vector } from "../direction";

export interface Bullet {
  position: Vector;
  heading: Vector;
}

export const BulletController = (context: CanvasRenderingContext2D) => {
  let bullets: Bullet[] = [];

  const getBullets = () => bullets;

  const fire = (position: Vector, heading: Vector) => {
    bullets.push({ position, heading });
  };

  const update = () => {
    bullets = bullets
      .map(({ position, heading, ...others }) => {
        const speed = isDiag(heading)
          ? PLAYER_BULLET_DIAG_SPEED
          : PLAYER_BULLET_SPEED;

        return {
          position: {
            x: position.x + heading.x * speed,
            y: position.y + heading.y * speed,
          },
          heading,
          ...others,
        };
      })
      .filter(
        ({ position }) =>
          position.x > 0 &&
          position.x < SCREEN_WIDTH &&
          position.y > 0 &&
          position.y < SCREEN_HEIGHT
      );
  };

  const draw = () => {
    update();

    bullets.forEach(({ position, heading }) => {
      const end = getLineEnd(position, heading, PLAYER_BULLET_LENGTH);

      context.beginPath();
      context.moveTo(position.x, position.y);
      context.lineTo(end.x, end.y);
      context.strokeStyle = PLAYER_BULLET_COLOR;
      context.stroke();
      context.closePath();
    });
  };

  const reset = () => {
    bullets = [];
  };

  return { draw, fire, getBullets, reset, _f: () => ({ update }) };
};

export type BulletControllerInstance = ReturnType<typeof BulletController>;
