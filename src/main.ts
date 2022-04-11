import { SCREEN_HEIGHT, SCREEN_WIDTH, SPRITE_SIZE } from "./constants";
import { Player } from "./objects/Player";
import { keys } from "./keys";
import { getScreen } from "./screen";
import "./style.css";
import { Baddie, BaddieType } from "./objects/Baddie";
import { enableDebug } from "./debug";
import { BulletController } from "./objects/Bullet";

const { context } = getScreen();

const bulletController = BulletController(context);
const player = Player(context, bulletController);
let paused = false;

export const setPaused = () => (paused = true);

let baddies: BaddieType[] = [
  Baddie(context, { x: 50, y: 50 }),
  Baddie(context, { x: SCREEN_WIDTH - 50 - SPRITE_SIZE, y: 50 }),
  Baddie(context, { x: 50, y: SCREEN_HEIGHT - 50 - SPRITE_SIZE }),
  Baddie(context, {
    x: SCREEN_WIDTH - 50 - SPRITE_SIZE,
    y: SCREEN_HEIGHT - 50 - SPRITE_SIZE,
  }),
];

const checkKeys = () => {
  paused = keys["pause"];

  if (enableDebug && keys["KeyR"]) {
    player.reset();
    baddies.forEach(({ reset }) => reset());
  }

  // check x
  if (!keys["ArrowLeft"] && !keys["ArrowRight"]) {
    player.move({ x: 0 });
  } else if (keys["ArrowLeft"] && !keys["ArrowRight"]) {
    player.move({ x: -1 });
  } else if (keys["ArrowRight"] && !keys["ArrowLeft"]) {
    player.move({ x: 1 });
  }
  // check y
  if (!keys["ArrowUp"] && !keys["ArrowDown"]) {
    player.move({ y: 0 });
  } else if (keys["ArrowUp"] && !keys["ArrowDown"]) {
    player.move({ y: -1 });
  } else if (keys["ArrowDown"] && !keys["ArrowUp"]) {
    player.move({ y: 1 });
  }

  player.setHold(keys["Shift"]);
};

let lastRender = 0;
const fps = 30;
const fpsInterval = 1000 / fps;

const animate = (newtime: number) => {
  requestAnimationFrame(animate);
  checkKeys();

  const elapsed = newtime - lastRender;
  if (paused || elapsed < fpsInterval) return;

  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  player.update();
  player.draw();

  const playerPosition = player.getPosition();
  const playerBullets = player.getBullets();

  baddies = baddies.filter((baddie) => baddie.isAlive());

  baddies.forEach((baddie) => {
    baddie.setHeading(playerPosition);
    baddie.move();
    baddie.checkIntersection(playerBullets);
    baddie.draw();
  });
};

animate(performance.now());
