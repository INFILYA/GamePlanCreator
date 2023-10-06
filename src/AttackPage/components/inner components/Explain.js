import { Switch } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";

export function Explain({
  confirmReturn,
  setConfirmReturn,
  disableSwitch,
  saveDataOfActions,
  setSaveDataOfActions,
  diagrammValue,
  handleDiagrammValue,
  returnOldData,
  type,
  setShowDataOfActions,
  showDataOfActions,
}) {
  const [isRegistratedUser] = useAuthState(auth);
  const admin = isRegistratedUser?.uid === "ld4Bdj6KepVG68kjNHHQRjacJI13";
  const attack = type === "Attack";
  return (
    <>
      {confirmReturn ? (
        <div className="saveBox" style={!saveDataOfActions ? { backgroundColor: "orangered" } : {}}>
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
        !showDataOfActions && (
          <div
            className="saveBox"
            style={saveDataOfActions ? { backgroundColor: "orangered" } : {}}
          >
            <label>Add Data</label>
            <Switch
              onChange={() => setSaveDataOfActions(!saveDataOfActions)}
              disabled={disableSwitch}
              className="switch-size"
            />
          </div>
        )
      )}
      {isRegistratedUser && !saveDataOfActions && (
        <div
          className="saveBox"
          style={
            (showDataOfActions && !saveDataOfActions) || showDataOfActions
              ? { backgroundColor: "orangered" }
              : {}
          }
        >
          <label>Show Data</label>
          <Switch
            onChange={() => setShowDataOfActions(!showDataOfActions)}
            disabled={disableSwitch}
            className="switch-size"
          />
        </div>
      )}
      {saveDataOfActions && (
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
