import type { Skittle } from "./skittle.ts";

export type Points = number;

export function pointsOf(...skittles: readonly Skittle[]): Points {
  assertNoDuplicates(skittles);
  const [first] = skittles;
  if (skittles.length === 1 && first !== undefined) {
    return first.number;
  }
  return skittles.length;
}

// 各番号のスキットルは1本ずつしかないため、同じ番号が重複していたらエラーにする
function assertNoDuplicates(skittles: readonly Skittle[]): void {
  const duplicate = skittles.find(
    (skittle, index) => skittles.findIndex((other) => other.number === skittle.number) !== index,
  );
  if (duplicate !== undefined) {
    throw new Error(`スキットル ${duplicate.number} が重複しています`);
  }
}
