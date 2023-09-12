import { Switch } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export function Explain({
  confirmReturn,
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
  return (
    <>
      {confirmReturn ? (
        <div className="saveBox" style={!saveDataOfAttacks ? { backgroundColor: "orangered" } : {}}>
          <label>Return?</label>
          <div>
            <button type="button" className="returnButton" onClick={() => returnOldData()}>
              Confirm
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
            name={type === "Attack" ? "winPoints" : "aces"}
            onChange={handleDiagrammValue}
            value={type === "Attack" ? diagrammValue.winPoints : diagrammValue.aces}
            placeholder={type === "Attack" ? "Win" : "Aces"}
            required
          ></input>
          <input
            style={{ backgroundColor: "yellow" }}
            name={type === "Attack" ? "leftInGame" : "servicePlus"}
            onChange={handleDiagrammValue}
            value={type === "Attack" ? diagrammValue.leftInGame : diagrammValue.servicePlus}
            placeholder={type === "Attack" ? "Left" : "servicePlus"}
            required
          ></input>
          <input
            style={{ backgroundColor: "orange" }}
            name={type === "Attack" ? "attacksInBlock" : "serviceMinus"}
            onChange={handleDiagrammValue}
            value={type === "Attack" ? diagrammValue.attacksInBlock : diagrammValue.serviceMinus}
            placeholder={type === "Attack" ? "block" : "serviceMinus"}
            required
          ></input>
          <input
            style={{ backgroundColor: "orangered" }}
            name={type === "Attack" ? "loosePoints" : "serviceFailed"}
            onChange={handleDiagrammValue}
            value={type === "Attack" ? diagrammValue.loosePoints : diagrammValue.serviceFailed}
            placeholder={type === "Attack" ? "Loose" : "serviceFailed"}
            required
          ></input>
        </div>
      )}
    </>
  );
}
