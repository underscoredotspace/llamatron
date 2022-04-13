import { Direction } from "../direction";
import { PlayerController } from "./Player";

describe("Player object", () => {
  const context = {} as any;
  const bullets = {} as any;

  test("intial state", () => {
    const player = PlayerController(context, bullets);

    expect(player._v()).toEqual({
      direction: Direction.LEFT,
      position: {
        x: 312,
        y: 192,
      },
      heading: {
        x: 0,
        y: 0,
      },
    });
  });

  test.each`
    x            | y            | direction
    ${1}         | ${undefined} | ${Direction.RIGHT}
    ${-1}        | ${undefined} | ${Direction.LEFT}
    ${undefined} | ${-1}        | ${Direction.UP}
    ${undefined} | ${1}         | ${Direction.DOWN}
    ${-1}        | ${-1}        | ${Direction.UPLEFT}
    ${1}         | ${-1}        | ${Direction.UPRIGHT}
    ${-1}        | ${1}         | ${Direction.DOWNLEFT}
    ${1}         | ${1}         | ${Direction.DOWNRIGHT}
  `("move({ x: $x, y: $y })", ({ x, y, direction }) => {
    const player = PlayerController(context, bullets);
    player.move({ x });
    player.move({ y });
    player._f.setDirection();

    expect(player._v()).toMatchObject({
      direction,
      heading: {
        x: x ?? 0,
        y: y ?? 0,
      },
    });
  });
});
