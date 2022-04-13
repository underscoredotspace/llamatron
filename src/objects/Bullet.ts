import {
  PLAYER_BULLET_COLOR,
  PLAYER_BULLET_DIAG_SPEED,
  PLAYER_BULLET_LENGTH,
  PLAYER_BULLET_SPEED,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../constants";
import { getLineEnd, isDiag, Vector } from "../direction";

export class Bullet {
  private spent = false;
  public position: Vector;
  public heading: Vector;

  constructor(position: Vector, heading: Vector) {
    this.position = position;
    this.heading = heading;
  }

  public setSpent() {
    this.spent = true;
  }

  public setPosition(position: Vector) {
    this.position = position;
  }

  public getIsSpent = () => this.spent;
}

export const BulletController = (context: CanvasRenderingContext2D) => {
  let bullets: Bullet[] = [];

  const getBullets = () => bullets;

  const fire = (position: Vector, heading: Vector) => {
    bullets.push(new Bullet(position, heading));
  };

  const update = () => {
    bullets = bullets
      .filter((bullet) => !bullet.getIsSpent())
      .map((bullet) => {
        const speed = isDiag(bullet.heading)
          ? PLAYER_BULLET_DIAG_SPEED
          : PLAYER_BULLET_SPEED;

        bullet.setPosition({
          x: bullet.position.x + bullet.heading.x * speed,
          y: bullet.position.y + bullet.heading.y * speed,
        });

        return bullet;
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

  return { draw, fire, update, getBullets, reset };
};

export type BulletControllerInstance = ReturnType<typeof BulletController>;
