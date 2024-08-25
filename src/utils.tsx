export const mapToAlphabet = (x: number) => {
  if (x < 0 || x > 1) {
    throw new Error("Input must be in the range [0, 1]");
  }
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const index = Math.floor(26 * x);

  return alphabet[index];
};

export const snapToUnit = (value: number): number => {
  if (value < 1) return value;
  return snapToUnit(value / 10);
};
