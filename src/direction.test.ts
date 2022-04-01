import { Direction, getRelativeAngle, getRelativeDirection } from "./direction";

describe("getRelativeAngle", () => {
  test("vector2 is 135deg from vector1", () => {
    const vector1 = { x: 0, y: 0 };
    const vector2 = { x: 10, y: 10 };

    const result = getRelativeAngle(vector1, vector2);

    expect(result).toEqual(135);
  });

  test("vector2 is 90deg from vector1", () => {
    const vector1 = { x: 0, y: 0 };
    const vector2 = { x: 10, y: 0 };

    const result = getRelativeAngle(vector1, vector2);

    expect(result).toEqual(90);
  });

  test("vector2 is 0deg from vector1", () => {
    const vector1 = { x: 10, y: 10 };
    const vector2 = { x: 10, y: 0 };

    const result = getRelativeAngle(vector1, vector2);

    expect(result).toEqual(0);
  });

  test("vector2 is 315deg from vector1", () => {
    const vector1 = { x: 10, y: 10 };
    const vector2 = { x: 5, y: 5 };

    const result = getRelativeAngle(vector1, vector2);

    expect(result).toEqual(315);
  });
});

describe("getRelativeDirection", () => {
  test("should round angle to the nearest direction", () => {
    const vector1 = { x: 0, y: 2 };
    const vector2 = { x: 5, y: 5 };

    const result = getRelativeDirection(vector1, vector2);
    expect(result).toBe(Direction.DOWNRIGHT);
  });
});
