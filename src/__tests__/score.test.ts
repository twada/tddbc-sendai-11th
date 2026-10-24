import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { skittle } from "../skittle.ts";
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
});
