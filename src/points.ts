import type { Skittle } from "./skittle.ts";

export type Points = number;

export function pointsOf(...skittles: readonly Skittle[]): Points {
  const duplicate = skittles.find(
    (skittle, index) => skittles.findIndex((other) => other.number === skittle.number) !== index,
  );
  if (duplicate !== undefined) {
    throw new Error(`スキットル ${duplicate.number} が重複しています`);
  }
  const [first] = skittles;
  if (skittles.length === 1 && first !== undefined) {
    return first.number;
  }
  return skittles.length;
}
