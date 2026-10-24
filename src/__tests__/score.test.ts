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
});
