export type SkittleNumber = number;

export type Skittle = {
  readonly number: SkittleNumber;
};

export function skittle(number: SkittleNumber): Skittle {
  return { number };
}
