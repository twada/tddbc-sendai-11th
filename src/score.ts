import { pointsOf } from "./points.ts";
import type { Skittle } from "./skittle.ts";

// 1回の投てきで倒したスキットル
export type Throw = readonly Skittle[];

export type Score = number;

export function scoreOf(...throws: readonly Throw[]): Score {
  const [first] = throws;
  if (first === undefined) {
    return 0;
  }
  return pointsOf(...first);
}
