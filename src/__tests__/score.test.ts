import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { skittle, type Skittle } from "../skittle.ts";
import { scoreOf } from "../score.ts";

describe("scoreOf", () => {
  it("1回も投てきしていないときは0点", () => {
    assert(scoreOf() === 0);
  });
  it("1回目に5本倒すと5点", () => {
    assert(scoreOf([skittle(1), skittle(2), skittle(3), skittle(4), skittle(5)]) === 5);
  });
  it("2回目に11番を1本倒すと16点", () => {
    const first = [skittle(1), skittle(2), skittle(3), skittle(4), skittle(5)];
    const second = [skittle(11)];
    assert(scoreOf(first, second) === 16);
  });
  describe("1本も倒さなかった投てき", () => {
    it("1回投てきして1本も倒さなかったら0点(投てき0回とは区別する)", () => {
      assert(scoreOf([]) === 0);
    });
    it("途中に1本も倒さなかった投てきが挟まってもよい", () => {
      const first = [skittle(1), skittle(2), skittle(3), skittle(4), skittle(5)];
      const miss: Skittle[] = [];
      const third = [skittle(11)];
      assert(scoreOf(first, miss, third) === 16);
    });
  });
  describe("お題に書かれていないことの扱い", () => {
    it("異なる投てきで同じ番号のスキットルを倒してもよい", () => {
      assert(scoreOf([skittle(5)], [skittle(5)]) === 10);
    });
    it("得点に上限はない", () => {
      const twelve = [skittle(12)];
      assert(scoreOf(twelve, twelve, twelve, twelve, twelve) === 60);
    });
    it("2回目の投てきに重複があれば、1回目が正常でもエラーになる", () => {
      assert.throws(() => scoreOf([skittle(3)], [skittle(5), skittle(5)]), {
        name: "Error",
        message: "スキットル 5 が重複しています",
      });
    });
  });
  // 以下は型レベルの決定。検証は `npm run typecheck` が担う。
  // 型検査だけが目的なので、呼び出しは関数に包んで実行しない。
  describe("投てきはスキットルの配列として渡す", () => {
    it("スキットルを投てきとして直接渡せない", () => {
      void (() => {
        // @ts-expect-error Skittle は Throw ではない(正しくは [skittle(5)])
        scoreOf(skittle(5));
      });
    });
    it("数値を投てきとして渡せない", () => {
      void (() => {
        // @ts-expect-error number は Throw ではない
        scoreOf(5);
      });
    });
  });
});
