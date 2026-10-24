// 環境確認用のダミー。モルック演習の開始時に削除する。
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hello } from "../hello.ts";

describe("hello", () => {
  it("名前を受け取って挨拶を返す", () => {
    assert(hello("TDDBC") === "Hello, TDDBC!");
  });
});
