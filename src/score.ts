import { pointsOf } from "./points.ts";
import type { Skittle } from "./skittle.ts";

// 1回の投てきで倒したスキットル
export type Throw = readonly Skittle[];

export type Score = number;

export function scoreOf(...throws: readonly Throw[]): Score {
  return throws.reduce((score, knocked) => score + pointsOf(...knocked), 0);
}
