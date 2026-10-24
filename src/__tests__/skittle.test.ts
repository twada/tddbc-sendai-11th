// 範囲外の番号はコンパイル時に型エラーとして防ぎ、実行時には検証しない。
// このファイルの検証は `npm run typecheck` が担う(`@ts-expect-error` が不要になると tsc が失敗する)。
import { describe, it } from "node:test";
import { skittle } from "../skittle.ts";

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
});
