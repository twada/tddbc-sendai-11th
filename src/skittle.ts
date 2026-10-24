import assert from "node:assert/strict";

export type SkittleNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Skittle = {
  readonly number: SkittleNumber;
};

export function skittle(number: SkittleNumber): Skittle {
  // 型で保証している前提を、実行時にも表明として確かめる
  assert(
    Number.isInteger(number) && 1 <= number && number <= 12,
    `スキットル番号は 1〜12 の整数: ${number}`,
  );
  return { number };
}
