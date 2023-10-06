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
  const [zoneValue, setZoneValue] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [diagrammValue, setDiagrammValue] = useState({
    winPoints: 0,
    leftInGame: 0,
    attacksInBlock: 0,
    loosePoints: 0,
    plusMinusOnAttack: 0,
    percentOfAttack: 0,
  });
  const classNamesForConesAndInputs = ["5A", "5B", "6A", "6B", "1A", "1B"];
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
    obj.percentOfAttack = Math.round(
      (obj.winPoints /
        (obj.winPoints + obj.attacksInBlock + obj.loosePoints + obj.leftInGame + 0.0001)) *
        100
    );
    return obj;
  };

  return (
    <WrapperForFields
      zoneValue={zoneValue}
      diagrammValue={diagrammValue}
      setDiagrammValue={setDiagrammValue}
      setZoneValue={setZoneValue}
      playerInfo={playerInfo}
      calculateForData={calculateForData}
      zonesStates={zonesStates}
      setZonesStates={setZonesStates}
      classNamesForConesAndInputs={classNamesForConesAndInputs}
      choosenActionOne="FastBall"
      choosenActionTwo="HighBall"
      type="Attack"
    />
  );
}
