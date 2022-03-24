import { SCREEN_HEIGHT, SCREEN_WIDTH, SPEED } from "./constants";
import { Player } from "./objects/Player";
import { keys } from "./keys";
import { getScreen } from "./screen";
import "./style.css";

const { context } = getScreen();
const player = Player(context);

const checkKeys = () => {
  if (keys["ArrowLeft"] && !keys["ArrowRight"]) {
    player.move(-SPEED);
  }

  if (keys["ArrowRight"] && !keys["ArrowLeft"]) {
    player.move(SPEED);
  }

  if (keys["ArrowUp"] && !keys["ArrowDown"]) {
    player.move(0, -SPEED);
  }

  if (keys["ArrowDown"] && !keys["ArrowUp"]) {
    player.move(0, SPEED);
  }
};

const animate = async (ctx: CanvasRenderingContext2D, _ticks: number) => {
  requestAnimationFrame((newTicks) => animate(ctx, newTicks));

  checkKeys();
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  player.draw();
};

animate(context, performance.now());
