// pointsOf の性質を Property-based Testing(fast-check)で確かめる。
// お題の例やペアで決めたことは points.test.ts に、どの入力でも成り立つ性質はこのファイルに置く。
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as fc from "fast-check";
import { pointsOf } from "../points.ts";
import { arbitrarySkittle, arbitraryThrow } from "./arbitraries.ts";

describe("pointsOf の性質", () => {
  describe("点数のルールと範囲", () => {
    it("1本だけ倒したら、そのスキットル番号が点数になる", () => {
      fc.assert(
        fc.property(arbitrarySkittle, (knocked) => {
          assert(pointsOf(knocked) === knocked.number);
        }),
      );
    });
    it("2本以上倒したら、倒した本数が点数になる", () => {
      fc.assert(
        fc.property(arbitraryThrow({ minLength: 2 }), (knocked) => {
          assert(pointsOf(...knocked) === knocked.length);
        }),
      );
    });
    it("点数は0点以上12点以下", () => {
      fc.assert(
        fc.property(arbitraryThrow(), (knocked) => {
          const points = pointsOf(...knocked);
          assert(0 <= points && points <= 12);
        }),
      );
    });
    it("倒した順序を入れ替えても点数は変わらない", () => {
      const original = arbitraryThrow();
      const withShuffled = original.chain((knocked) =>
        fc
          .shuffledSubarray([...knocked], { minLength: knocked.length })
          .map((shuffled) => ({ knocked, shuffled })),
      );
      fc.assert(
        fc.property(withShuffled, ({ knocked, shuffled }) => {
          assert(pointsOf(...shuffled) === pointsOf(...knocked));
        }),
      );
    });
  });
});
