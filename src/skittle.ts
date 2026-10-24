export type SkittleNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Skittle = {
  readonly number: SkittleNumber;
};

export function skittle(number: SkittleNumber): Skittle {
  return { number };
}
