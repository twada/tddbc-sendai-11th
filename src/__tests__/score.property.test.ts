// scoreOf / scoreHistoryOf の性質を Property-based Testing(fast-check)で確かめる。
// お題の例やペアで決めたことは score.test.ts に、どの入力でも成り立つ性質はこのファイルに置く。
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as fc from "fast-check";
import { pointsOf } from "../points.ts";
import { scoreHistoryOf, scoreOf } from "../score.ts";
import { arbitraryThrows } from "./arbitraries.ts";

describe("scoreHistoryOf の性質", () => {
  describe("推移の形", () => {
    it("推移の長さは投てきの回数と同じ", () => {
      fc.assert(
        fc.property(arbitraryThrows, (throws) => {
          assert(scoreHistoryOf(...throws).length === throws.length);
        }),
      );
    });
    it("得点は減らない", () => {
      fc.assert(
        fc.property(arbitraryThrows, (throws) => {
          const history = scoreHistoryOf(...throws);
          assert(history.every((score, i) => (history[i - 1] ?? 0) <= score));
        }),
      );
    });
    it("隣り合う得点の差は、その投てきの点数", () => {
      fc.assert(
        fc.property(arbitraryThrows, (throws) => {
          const history = scoreHistoryOf(...throws);
          const differences = history.map((score, i) => score - (history[i - 1] ?? 0));
          assert.deepEqual(
            differences,
            throws.map((knocked) => pointsOf(...knocked)),
          );
        }),
      );
    });
    it("推移の最後の値は現在の得点(投てきが無ければ0点)", () => {
      fc.assert(
        fc.property(arbitraryThrows, (throws) => {
          assert((scoreHistoryOf(...throws).at(-1) ?? 0) === scoreOf(...throws));
        }),
      );
    });
  });
});

describe("scoreOf の性質", () => {
  describe("得点の積み重ね", () => {
    it("前半と後半に分けた得点の和は、全体の得点と同じ", () => {
      fc.assert(
        fc.property(arbitraryThrows, arbitraryThrows, (former, latter) => {
          assert(scoreOf(...former, ...latter) === scoreOf(...former) + scoreOf(...latter));
        }),
      );
    });
    it("投てきが増えても、それまでの推移は変わらない", () => {
      fc.assert(
        fc.property(arbitraryThrows, arbitraryThrows, (former, latter) => {
          assert.deepEqual(
            scoreHistoryOf(...former, ...latter).slice(0, former.length),
            scoreHistoryOf(...former),
          );
        }),
      );
    });
    it("投てきの順序を入れ替えても、現在の得点は変わらない", () => {
      const withShuffled = arbitraryThrows.chain((throws) =>
        fc
          .shuffledSubarray([...throws], { minLength: throws.length })
          .map((shuffled) => ({ throws, shuffled })),
      );
      fc.assert(
        fc.property(withShuffled, ({ throws, shuffled }) => {
          assert(scoreOf(...shuffled) === scoreOf(...throws));
        }),
      );
    });
  });
});
