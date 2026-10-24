import type { Skittle } from "./skittle.ts";

export type Points = number;

export function pointsOf(skittle: Skittle): Points {
  return skittle.number;
}
