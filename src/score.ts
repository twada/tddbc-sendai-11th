import type { Skittle } from "./skittle.ts";

// 1回の投てきで倒したスキットル
export type Throw = readonly Skittle[];

export type Score = number;

export function scoreOf(..._throws: readonly Throw[]): Score {
  return 0;
}
