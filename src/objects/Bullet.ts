import {
  PLAYER_BULLET_DIAG_LENGTH,
  PLAYER_BULLET_DIAG_SPEED,
  PLAYER_BULLET_LENGTH,
  PLAYER_BULLET_SPEED,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../constants";

interface Bullet {
  xPos: number;
  yPos: number;
  xHead: number;
  yHead: number;
  color: string;
  length: number;
}

export const BulletController = (context: CanvasRenderingContext2D) => {
  let bullets: Bullet[] = [];

  const fire = (xPos: number, yPos: number, xHead: number, yHead: number) => {
    bullets.push(CreateBullet({ xPos, yPos, xHead, yHead, color: "red" }));
  };

  const update = () => {
    bullets = bullets
      .map(({ xPos, yPos, xHead, yHead, ...others }) => ({
        xPos: xPos + xHead,
        yPos: yPos + yHead,
        xHead,
        yHead,
        ...others,
      }))
      .filter(
        ({ xPos, yPos }) =>
          xPos > 0 && xPos < SCREEN_WIDTH && yPos > 0 && yPos < SCREEN_HEIGHT
      );
  };

  const draw = () => {
    update();

    bullets.forEach(({ xPos, yPos, xHead, yHead, length = 0, color }) => {
      const xLength = xHead > 0 ? length : -length;
      const yLength = yHead > 0 ? length : -length;

      context.beginPath();
      context.moveTo(xPos, yPos);
      context.lineTo(
        xHead !== 0 ? xPos + xLength : xPos,
        yHead !== 0 ? yPos + yLength : yPos
      );
      context.strokeStyle = color;
      context.stroke();
      context.closePath();
    });
  };

  return { draw, fire, _f: () => ({ update }) };
};

export const CreateBullet = ({
  xHead: _xHead,
  yHead: _yHead,
  ...otherProps
}: Omit<Bullet, "length">): Bullet => {
  const diag = _xHead !== 0 && _yHead !== 0;

  const speed = diag ? PLAYER_BULLET_SPEED : PLAYER_BULLET_DIAG_SPEED;
  const length = diag ? PLAYER_BULLET_DIAG_LENGTH : PLAYER_BULLET_LENGTH;

  return {
    xHead: _xHead * speed,
    yHead: _yHead * speed,
    length,
    ...otherProps,
  };
};
