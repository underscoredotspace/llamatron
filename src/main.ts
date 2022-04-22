import { SCREEN_HEIGHT, SCREEN_WIDTH, SPRITE_SIZE } from "./constants";
import { CreatePlayer } from "./objects/Player";
import { keys } from "./keys";
import { getScreen } from "./screen";
import "./style.css";
import { CreateBaddie } from "./objects/Baddie";
import { enableDebug } from "./debug";
import { BulletController } from "./objects/Bullet";
import { SEGMENTS } from "./segments";
import { random } from "./helpers/math";
import { Baddie } from "./objects/Baddie.types";

const { context } = getScreen();

const bulletController = BulletController(context);
const player = CreatePlayer(context, bulletController);
let paused = false;

export const setPaused = () => (paused = true);

let baddies: Baddie[] = [];

for (let index = 0; index < 40; index++) {
  const segmentIndex = index % SEGMENTS.length;
  const segment = SEGMENTS[segmentIndex];

  const baddie = CreateBaddie(context, {
    x: random(segment.x, segment.x + segment.w - SPRITE_SIZE),
    y: random(segment.y, segment.y + segment.h - SPRITE_SIZE),
  });

  baddies.push(baddie);
}

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

  player.setStrafe(keys["Shift"]);
};

let lastRender = 0;
const fps = 60;
const fpsInterval = 1000 / fps;

const animate = (newtime: number) => {
  requestAnimationFrame(animate);
  checkKeys();

  const elapsed = newtime - lastRender;
  if (paused || elapsed < fpsInterval) return;
  lastRender = newtime;

  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  player.update();
  player.draw();

  if (player.isDestroyed()) {
    player.reset();
    baddies.forEach(({ reset }) => reset());
    return;
  }

  const playerPosition = player.getPosition();

  baddies = baddies.filter((baddie) => !baddie.isDestroyed());

  baddies.forEach((baddie) => {
    baddie.setHeading(playerPosition);
    baddie.update();
    baddie.checkIntersection(player);
    baddie.draw();
  });
};

animate(performance.now());
