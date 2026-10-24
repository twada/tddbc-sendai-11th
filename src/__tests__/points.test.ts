import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { skittle } from "../skittle.ts";
import { pointsOf } from "../points.ts";

describe("pointsOf", () => {
  describe("スキットルを1本倒した場合", () => {
    it("5番を倒したら5点", () => {
      assert(pointsOf(skittle(5)) === 5);
    });
  });
});
