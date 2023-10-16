export function reduce(arr, sum = 0) {
  return arr.reduce((a, b) => a + b, sum);
}
export function correctNamesOfZones(index) {
  const zones = ["P4", "P3", "P2", "P5", "P6", "P1"];
  return zones[index];
}
export function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}