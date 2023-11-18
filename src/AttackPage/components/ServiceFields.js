import { useSelector } from "react-redux";
import WrapperForFields from "./WrapperForFields";
import { useState } from "react";
import { getPlusMinusService, getServiceEfficency } from "../../Datas/api";

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
  });

  function calculateForData(obj) {
    for (let key in diagrammValue) {
      obj[key] += diagrammValue[key];
    }
    obj.plusMinusOnService = getPlusMinusService(obj); //встановлюємо + - на подачі
    obj.efficencyService = getServiceEfficency(obj); // встановлюємо ефективність подачі
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
