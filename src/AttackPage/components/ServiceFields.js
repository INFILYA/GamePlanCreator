import { useSelector } from "react-redux";
import WrapperForFields from "./WrapperForFields";
import { useState } from "react";

export function ServiceFields() {
  const playerInfos = useSelector((state) => state.playerInfo.playerInfo);
  const playerInfo = { ...playerInfos };
  const [zonesStates, setZonesStates] = useState([
    { zone: "serviceZone1", active: false },
    { zone: "serviceZone6", active: false },
    { zone: "serviceZone5", active: false },
  ]);
  const [diagrammValue, setDiagrammValue] = useState({
    aces: 0,
    servicePlus: 0,
    serviceMinus: 0,
    serviceFailed: 0,
    plusMinusOnService: 0,
  });

  function calculateForData(obj) {
    if (obj === playerInfo) {
      diagrammValue.plusMinusOnService =
        diagrammValue.aces * 2 +
        diagrammValue.servicePlus * 0.5 -
        diagrammValue.serviceFailed -
        diagrammValue.serviceMinus * 0.5;
    }
    for (let key in diagrammValue) {
      obj[key] += diagrammValue[key];
    }
    return obj;
  }

  return (
    <WrapperForFields
      diagrammValue={diagrammValue}
      setDiagrammValue={setDiagrammValue}
      calculateForData={calculateForData}
      zonesStates={zonesStates}
      setZonesStates={setZonesStates}
      playerInfo={playerInfo}
      type="Service"
    />
  );
}
