import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { Player } from "./objects/Player";
import { keys } from "./keys";
import { getScreen } from "./screen";
import "./style.css";

const { context } = getScreen();
const player = Player(context);

const checkKeys = () => {
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
const fps = 15;
const fpsInterval = 1000 / fps;

const animate = (newtime: number) => {
  requestAnimationFrame(animate);
  checkKeys();

  const elapsed = newtime - lastRender;
  if (elapsed < fpsInterval) return;
  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  player.draw();
};

animate(performance.now());
