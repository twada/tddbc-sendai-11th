// スキットルに関する型レベルの決定を `@ts-expect-error` で固定する。
// いずれも静的に検証できる制約なので、実行時には検証しない(ADR 0009)。
// このファイルの検証は `npm run typecheck` が担う(`@ts-expect-error` が不要になると tsc が失敗する)。
import { describe, it } from "node:test";
import { skittle } from "../skittle.ts";
import { pointsOf, type Points } from "../points.ts";

describe("skittle", () => {
  describe("スキットル番号は1〜12のみ", () => {
    it("0番のスキットルは作れない", () => {
      // @ts-expect-error 0 は SkittleNumber ではない
      skittle(0);
    });
    it("13番のスキットルは作れない", () => {
      // @ts-expect-error 13 は SkittleNumber ではない
      skittle(13);
    });
    it("1.5番のスキットルは作れない", () => {
      // @ts-expect-error 1.5 は SkittleNumber ではない
      skittle(1.5);
    });
  });

  describe("スキットルは数値として扱えない", () => {
    it("スキットルをそのまま点数にはできない", () => {
      // @ts-expect-error Skittle は Points ではない(点数にするには pointsOf を通す)
      const points: Points = skittle(5);
      void points;
    });
    it("数値をスキットルとして点数計算に渡せない", () => {
      // @ts-expect-error number は Skittle ではない
      pointsOf(5);
    });
  });
});
