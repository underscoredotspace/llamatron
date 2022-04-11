export const clamp = (value: number, min: number, max: number): number => {
  if (value <= min) return min;
  if (value >= max) return max;

  return value;
};

export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);
