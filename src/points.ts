import type { Skittle } from "./skittle.ts";

export type Points = number;

export function pointsOf(...skittles: readonly Skittle[]): Points {
  const [first] = skittles;
  if (skittles.length === 1 && first !== undefined) {
    return first.number;
  }
  if (skittles.length === 0) {
    return 0;
  }
  return 2;
}
