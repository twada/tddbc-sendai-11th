// Property-based Testing(fast-check)で使う、入力の生成器(arbitrary)
import * as fc from "fast-check";
import { skittle, type Skittle, type SkittleNumber } from "../skittle.ts";
import type { Throw } from "../score.ts";

// 1〜12 のすべてのスキットル番号
export const skittleNumbers: readonly SkittleNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// 任意のスキットル 1 本
export const arbitrarySkittle: fc.Arbitrary<Skittle> = fc
  .constantFrom(...skittleNumbers)
  .map((number) => skittle(number));

// 1 回の投てき: 12 本の中から重複なく選び、倒した順序もばらばらにしたもの
export function arbitraryThrow(constraints: { minLength?: number } = {}): fc.Arbitrary<Throw> {
  return fc
    .shuffledSubarray([...skittleNumbers], constraints)
    .map((numbers) => numbers.map((number) => skittle(number)));
}

// 投てきの履歴
export const arbitraryThrows: fc.Arbitrary<readonly Throw[]> = fc.array(arbitraryThrow(), {
  maxLength: 20,
});

// 重複を含む投てき: 正しい投てきに、その中の 1 本と同じ番号のスキットルを任意の位置に差し込む
export const arbitraryThrowWithDuplicate: fc.Arbitrary<{
  readonly duplicated: SkittleNumber;
  readonly knocked: Throw;
}> = fc.shuffledSubarray([...skittleNumbers], { minLength: 1 }).chain((numbers) =>
  fc
    .record({ duplicated: fc.constantFrom(...numbers), at: fc.nat({ max: numbers.length }) })
    .map(({ duplicated, at }) => ({
      duplicated,
      knocked: [...numbers.slice(0, at), duplicated, ...numbers.slice(at)].map((number) =>
        skittle(number),
      ),
    })),
);
