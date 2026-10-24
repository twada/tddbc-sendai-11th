import type { Skittle } from "./skittle.ts";

export type Points = number;

export function pointsOf(...skittles: readonly Skittle[]): Points {
  const [first, second] = skittles;
  if (first !== undefined && second !== undefined && first.number === second.number) {
    throw new Error(`スキットル ${first.number} が重複しています`);
  }
  if (skittles.length === 1 && first !== undefined) {
    return first.number;
  }
  return skittles.length;
}
