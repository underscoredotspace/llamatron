import { Direction } from "../direction";
import { CreatePlayer } from "./Player";
jest.mock("../debug");
jest.mock("../screen");

describe("Player object", () => {
  const bullets = {} as any;

  test("intial state", () => {
    const player = CreatePlayer(bullets);

    expect(player.debug.get()).toEqual({
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
    const player = CreatePlayer(bullets);
    player.move({ x });
    player.move({ y });
    player.debug.setDirection();

    expect(player.debug.get()).toMatchObject({
      direction,
      heading: {
        x: x ?? 0,
        y: y ?? 0,
      },
    });
  });
});
