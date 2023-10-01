import { Switch } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";

export function Explain({
  confirmReturn,
  setConfirmReturn,
  disableSwitch,
  saveDataOfAttacks,
  setSaveDataOfAttacks,
  diagrammValue,
  handleDiagrammValue,
  returnOldData,
  type,
  setShowDataOfAttacks,
  showDataOfAttacks,
}) {
  const [isRegistratedUser] = useAuthState(auth);
  const admin = isRegistratedUser?.uid === "ld4Bdj6KepVG68kjNHHQRjacJI13";
  const attack = type === "Attack";
  return (
    <>
      {confirmReturn ? (
        <div className="saveBox" style={!saveDataOfAttacks ? { backgroundColor: "orangered" } : {}}>
          <div>
            <button type="button" className="returnButton" onClick={() => returnOldData()}>
              Return
            </button>
            <button type="button" className="returnButton" onClick={() => setConfirmReturn(false)}>
              Close
            </button>
          </div>
        </div>
      ) : (
        admin &&
        !showDataOfAttacks && (
          <div
            className="saveBox"
            style={saveDataOfAttacks ? { backgroundColor: "orangered" } : {}}
          >
            <label>Add Data</label>
            <Switch
              onChange={() => setSaveDataOfAttacks(!saveDataOfAttacks)}
              disabled={disableSwitch}
              className="switch-size"
            />
          </div>
        )
      )}
      {isRegistratedUser && !saveDataOfAttacks && (
        <div
          className="saveBox"
          style={
            (showDataOfAttacks && !saveDataOfAttacks) || showDataOfAttacks
              ? { backgroundColor: "orangered" }
              : {}
          }
        >
          <label>Show Data</label>
          <Switch
            onChange={() => setShowDataOfAttacks(!showDataOfAttacks)}
            disabled={disableSwitch}
            className="switch-size"
          />
        </div>
      )}
      {saveDataOfAttacks && (
        <div className="input-wrapper">
          <input
            style={{ backgroundColor: "lightgreen" }}
            name={attack ? "winPoints" : "aces"}
            onChange={handleDiagrammValue}
            value={attack ? diagrammValue.winPoints : diagrammValue.aces}
            required
          ></input>
          <input
            style={{ backgroundColor: "yellow" }}
            name={attack ? "leftInGame" : "servicePlus"}
            onChange={handleDiagrammValue}
            value={attack ? diagrammValue.leftInGame : diagrammValue.servicePlus}
            required
          ></input>
          <input
            style={{ backgroundColor: "orange" }}
            name={attack ? "attacksInBlock" : "serviceMinus"}
            onChange={handleDiagrammValue}
            value={attack ? diagrammValue.attacksInBlock : diagrammValue.serviceMinus}
            required
          ></input>
          <input
            style={{ backgroundColor: "orangered" }}
            name={attack ? "loosePoints" : "serviceFailed"}
            onChange={handleDiagrammValue}
            value={attack ? diagrammValue.loosePoints : diagrammValue.serviceFailed}
            required
          ></input>
        </div>
      )}
    </>
  );
}
