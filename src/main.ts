import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { Player } from "./objects/Player";
import { keyboard } from "./keyboard";
import { getScreen } from "./screen";
import "./style.css";

const { context } = getScreen();
const player = Player(context);

const checkKeys = () => {
  const { keys } = keyboard;

  if (keys["ArrowLeft"] && !keys["ArrowRight"]) {
    player.move(-1);
  }

  if (keys["ArrowRight"] && !keys["ArrowLeft"]) {
    player.move(1);
  }

  if (keys["ArrowUp"] && !keys["ArrowDown"]) {
    player.move(0, -1);
  }

  if (keys["ArrowDown"] && !keys["ArrowUp"]) {
    player.move(0, 1);
  }
};

const animate = async (ctx: CanvasRenderingContext2D, _ticks: number) => {
  requestAnimationFrame((newTicks) => animate(ctx, newTicks));

  checkKeys();
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  player.draw();
};

animate(context, performance.now());
