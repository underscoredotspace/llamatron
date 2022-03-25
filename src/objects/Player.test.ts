import { Direction, Player } from "./Player";

describe("Player object", () => {
  const context = {} as any;
  test("intial state", () => {
    const player = Player(context);

    expect(player._v()).toEqual({
      direction: Direction.LEFT,
      xPos: 312,
      yPos: 192,
      xHead: 0,
      yHead: 0,
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
    const player = Player(context);
    player.move({ x });
    player.move({ y });
    player._f.setDirection();

    expect(player._v()).toMatchObject({
      direction,
      xHead: x ?? 0,
      yHead: y ?? 0,
    });
  });
});
