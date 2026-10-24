import type { Skittle } from "./skittle.ts";

export type Points = number;

export function pointsOf(...skittles: readonly Skittle[]): Points {
  const [first] = skittles;
  if (skittles.length === 1 && first !== undefined) {
    return first.number;
  }
  return skittles.length;
}
