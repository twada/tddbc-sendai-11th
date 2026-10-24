import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { skittle } from "../skittle.ts";
import { pointsOf } from "../points.ts";

describe("pointsOf", () => {
  describe("スキットルを1本倒した場合", () => {
    it("5番を倒したら5点", () => {
      assert(pointsOf(skittle(5)) === 5);
    });
    it("12番を倒したら12点", () => {
      assert(pointsOf(skittle(12)) === 12);
    });
  });
  describe("スキットルを2本以上倒した場合", () => {
    it("5番と8番を倒したら2点", () => {
      assert(pointsOf(skittle(5), skittle(8)) === 2);
    });
    it("3本倒したら3点", () => {
      assert(pointsOf(skittle(3), skittle(7), skittle(12)) === 3);
    });
  });
  describe("スキットルを1本も倒さなかった場合", () => {
    it("0点", () => {
      assert(pointsOf() === 0);
    });
  });
});
