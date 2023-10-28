import { useSelector } from "react-redux";
import WrapperForFields from "./WrapperForFields";
import { useState } from "react";

export function AttackFields() {
  const playerInfos = useSelector((state) => state.playerInfo.playerInfo);
  const playerInfo = { ...playerInfos };

  const [zonesStates, setZonesStates] = useState([
    { zone: "attackZone1", active: false },
    { zone: "attackZone2", active: false },
    { zone: "attackZone4", active: false },
    { zone: "attackPipe", active: false },
    { zone: "attackK1", active: false },
    { zone: "attackKC", active: false },
    { zone: "attackK7", active: false },
  ]);
  const [diagrammValue, setDiagrammValue] = useState({
    winPoints: 0,
    leftInGame: 0,
    attacksInBlock: 0,
    loosePoints: 0,
    plusMinusOnAttack: 0,
    percentOfAttack: 0,
  });
  const calculateForData = (obj) => {
    if (obj === playerInfo) {
      diagrammValue.plusMinusOnAttack =
        diagrammValue.winPoints - (diagrammValue.attacksInBlock + diagrammValue.loosePoints);
    }
    for (let key in diagrammValue) {
      if (key === "percentOfAttack") {
        continue;
      }
      obj[key] += diagrammValue[key];
    }
    obj.percentOfAttack = +(
      (obj.winPoints /
        (obj.winPoints + obj.attacksInBlock + obj.loosePoints + obj.leftInGame + 0.0001)) *
      100
    ).toFixed(1);
    return obj;
  };

  return (
    <WrapperForFields
      diagrammValue={diagrammValue}
      setDiagrammValue={setDiagrammValue}
      calculateForData={calculateForData}
      zonesStates={zonesStates}
      setZonesStates={setZonesStates}
      playerInfo={playerInfo}
      type="Attack"
    />
  );
}
