import { pointsOf } from "./points.ts";
import type { Skittle } from "./skittle.ts";

// 1回の投てきで倒したスキットル
export type Throw = readonly Skittle[];

export type Score = number;

export function scoreOf(...throws: readonly Throw[]): Score {
  return latestScore(scoreHistoryOf(...throws));
}

// 各投てきが終了した時点の得点を、投てきの順に並べたもの
export function scoreHistoryOf(...throws: readonly Throw[]): readonly Score[] {
  const points = throws.map((knocked) => pointsOf(...knocked));
  return points.reduce<readonly Score[]>(
    (history, latest) => [...history, latestScore(history) + latest],
    [],
  );
}

// 得点は 0 点から始まり、推移の最後の値がその時点の得点になる
function latestScore(history: readonly Score[]): Score {
  return history.at(-1) ?? 0;
}
