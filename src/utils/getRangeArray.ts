export const getRangeArray = (first: number, last: number): number[] =>
  Array(last - first + 1)
    .fill(first)
    .map<number>((number, idx) => number + idx)
