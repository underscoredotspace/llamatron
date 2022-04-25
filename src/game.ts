import { PLAYER_BULLET_LENGTH, SPRITE_SIZE } from "./constants";
import { getLineEnd } from "./direction";
import { clearScreen } from "./helpers/draw";
import { intersects } from "./helpers/intersection";
import { random } from "./helpers/math";
import { keys } from "./keys";
import { CreateBaddie } from "./objects/Baddie";
import { Baddie } from "./objects/Baddie.types";
import { BulletController } from "./objects/Bullet";
import { CreatePlayer } from "./objects/Player";
import { SEGMENTS } from "./segments";
import { Box } from "./types";

export const CreateGame = () => {
  let lastRender = performance.now();
  const FPS = 60;
  const FPS_INTERVAL = 1000 / FPS;

  const getRandomPostion = (segment: Box) => ({
    x: random(segment.x, segment.x + segment.w - SPRITE_SIZE),
    y: random(segment.y, segment.y + segment.h - SPRITE_SIZE),
  });

  const getBaddies = (count: number): Baddie[] =>
    new Array(count).fill({}).map((_, index) => {
      const segmentIndex = index % SEGMENTS.length;
      const segment = SEGMENTS[segmentIndex];
      return CreateBaddie(getRandomPostion(segment));
    });

  let baddies = getBaddies(40);

  const bullets = BulletController();
  const player = CreatePlayer(bullets);

  const checkIntersections = () => {
    const playerPosition = player.getPosition();
    const playerSize = player.getSize();

    baddies.forEach((baddie) => {
      const baddiePosition = baddie.getPosition();
      const baddieSize = baddie.getSize();

      bullets.getBullets().forEach((bullet) => {
        const bulletEnd = getLineEnd(
          bullet.position,
          bullet.heading,
          PLAYER_BULLET_LENGTH
        );

        // player's bullet has hit baddie
        if (
          intersects.lineRect(
            bullet.position,
            bulletEnd,
            baddiePosition,
            player.getSize()
          )
        ) {
          baddie.setDestroyed();
          bullet.setSpent();
        }

        // baddie has hit player
        if (
          intersects.rectRect(
            { ...baddiePosition, ...baddieSize },
            { ...playerPosition, ...playerSize }
          )
        ) {
          player.setDestroyed();
        }
      });
    });
  };

  (function animate(newtime: number) {
    requestAnimationFrame(animate);

    const elapsed = newtime - lastRender;
    if (keys["pause"] || elapsed < FPS_INTERVAL) {
      return;
    }
    lastRender = newtime;

    checkIntersections();

    if (player.isDestroyed() || baddies.length === 0) {
      player.reset();

      if (baddies.length === 0) {
        baddies = getBaddies(40);
      }
    }

    baddies = baddies.filter((baddie) => !baddie.isDestroyed());

    clearScreen();

    [player, bullets].forEach((entity) => {
      entity.update();
      entity.draw();
    });

    baddies.forEach((baddie) => {
      baddie.setHeading(player.getPosition());
      baddie.update();
      baddie.draw();
    });
  })(performance.now());

  return {
    debug: {},
  };
};
