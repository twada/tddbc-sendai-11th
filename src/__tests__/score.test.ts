import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { scoreOf } from "../score.ts";

describe("scoreOf", () => {
  it("1回も投てきしていないときは0点", () => {
    assert(scoreOf() === 0);
  });
});
