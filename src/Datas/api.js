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
export function getAttackEfficency(obj) {
  if (!("winPoints" in obj)) return 0;
  let totalAtt = [obj.winPoints, obj.leftInGame, obj.attacksInBlock, obj.loosePoints];
  const sumOfTotalAtt = totalAtt.reduce((a, b) => a + b, 0);
  if (sumOfTotalAtt === 0) return 0;
  const efficencyAttack = +((getPlusMinusAttack(obj) / sumOfTotalAtt) * 100).toFixed(1);
  return efficencyAttack;
}
export function getServiceEfficency(obj) {
  let totalService = [obj.aces, obj.servicePlus, obj.serviceMinus, obj.serviceFailed];
  const sumOfTotalService = totalService.reduce((a, b) => a + b, 0);
  if (sumOfTotalService === 0) return 0;
  const efficencyService = +((getPlusMinusService(obj) / sumOfTotalService) * 100).toFixed(1);
  return efficencyService;
}

export function getPlusMinusService(obj) {
  return obj.aces - obj.serviceFailed;
}
export function getPlusMinusAttack(obj) {
  return obj.winPoints - (obj.attacksInBlock + obj.loosePoints);
}
export function setStyle(params) {
  if (params === 0) return {};
  return { color: params >= 0 ? "green" : "red" };
}
export function gerPercentOfAttack(obj) {
  if (!("winPoints" in obj)) return 0;
  const totalAtt = [obj.winPoints, obj.leftInGame, obj.attacksInBlock, obj.loosePoints];
  const sumOfTotalAtt = totalAtt.reduce((a, b) => a + b, 0);
  if (sumOfTotalAtt === 0) return 0;
  const percents = +((obj.winPoints / sumOfTotalAtt) * 100).toFixed(1);
  return percents;
}
