export const createArrayFromRange = (range: Array<number>) => {
  const [min, max] = range;
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};
