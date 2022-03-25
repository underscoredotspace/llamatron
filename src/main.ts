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
};

const animate = () => {
  requestAnimationFrame(animate);

  checkKeys();
  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  player.draw();
};

animate();
