import { Switch } from "antd";

export function Explain({
  confirmReturn,
  disableSwitch,
  saveDataOfAttacks,
  setSaveDataOfAttacks,
  diagrammValue,
  handleDiagrammValue,
  returnOldData,
  type,
}) {
  return (
    <>
      <div>
        <div className="box">
          <label>15%➤</label>
          <button className="orangeSquare"></button>
        </div>
        <div className="box">
          <label>25%➤</label>
          <button className="pinkSquare"></button>
          <label>➤15%</label>
        </div>
        <div className="box">
          <label>35%➤</label>
          <button className="purpleSquare"></button>
          <label>➤25%</label>
        </div>
        <div className="box">
          <label></label>
          <button className="square"></button>
          <label>➤35%</label>
        </div>
      </div>
      <div className="comments">
        <label>Comments:</label>
        <textarea type="text" className="textcomment"></textarea>
      </div>
      {confirmReturn ? (
        <div>
          <label style={{ fontSize: 30 }}>Return Data?</label>
          <div>
            <button
              type="button"
              className="returnButton"
              onClick={() => returnOldData()}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <>
          <label style={{ fontSize: 30 }}>Add Data</label>
          <div className="saveBox">
            <Switch
              onChange={() => setSaveDataOfAttacks(!saveDataOfAttacks)}
              disabled={disableSwitch}
            />
          </div>
        </>
      )}
      {saveDataOfAttacks && (
        <div style={{ marginTop: 10 }}>
          <input
            style={{ backgroundColor: "lightgreen" }}
            name={type === "Attack" ? "winPoints" : "aces"}
            onChange={handleDiagrammValue}
            value={
              type === "Attack" ? diagrammValue.winPoints : diagrammValue.aces
            }
            placeholder={type === "Attack" ? "Win" : "Aces"}
            required
          ></input>
          <input
            style={{ backgroundColor: "yellow" }}
            name={type === "Attack" ? "leftInGame" : "servicePlus"}
            onChange={handleDiagrammValue}
            value={
              type === "Attack"
                ? diagrammValue.leftInGame
                : diagrammValue.servicePlus
            }
            placeholder={type === "Attack" ? "Left" : "servicePlus"}
            required
          ></input>
          <input
            style={{ backgroundColor: "orange" }}
            name={type === "Attack" ? "attacksInBlock" : "serviceMinus"}
            onChange={handleDiagrammValue}
            value={
              type === "Attack"
                ? diagrammValue.attacksInBlock
                : diagrammValue.serviceMinus
            }
            placeholder={type === "Attack" ? "block" : "serviceMinus"}
            required
          ></input>
          <input
            style={{ backgroundColor: "orangered" }}
            name={type === "Attack" ? "loosePoints" : "serviceFailed"}
            onChange={handleDiagrammValue}
            value={
              type === "Attack"
                ? diagrammValue.loosePoints
                : diagrammValue.serviceFailed
            }
            placeholder={type === "Attack" ? "Loose" : "serviceFailed"}
            required
          ></input>
        </div>
      )}
    </>
  );
}
