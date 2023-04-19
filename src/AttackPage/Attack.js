import { useState } from "react";
import RegularLabel from "../Labels/RegularLabel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { useSelector } from "react-redux";
import { savePlayer } from "../Datas/api";

function DefenderZone6() {
  const [blockHelp, setBlockHelp] = useState(0);
  const classNames = [
    "defenderOff",
    "defenderOn",
    "smallarrowleft",
    "smallarrowright",
  ];
  return (
    <>
      <button
        type="button"
        className={classNames[blockHelp]}
        onClick={() => setBlockHelp((blockHelp + 1) % 4)}
      ></button>
    </>
  );
}
function ConeReaction({
  attackPercentageArray,
  range0,
  range15,
  range25,
  range35,
  historyOfBalls,
}) {
  function button(zone) {
    return (
      <button
        type="button"
        className={
          (attackPercentageArray < 15 ? range0 + zone : "") ||
          (attackPercentageArray >= 15 && attackPercentageArray < 25
            ? range15 + zone
            : "") ||
          (attackPercentageArray >= 25 && attackPercentageArray < 35
            ? range25 + zone
            : "") ||
          (attackPercentageArray >= 35 ? range35 + zone : "")
        }
      ></button>
    );
  }
  return (
    <>
      {(historyOfBalls[0].active === true && button("zone1")) ||
        (historyOfBalls[1].active === true && button("zone2")) ||
        (historyOfBalls[2].active === true && button("zone4")) ||
        (historyOfBalls[3].active === true && button("Pipe")) ||
        (historyOfBalls[4].active === true && button("K1")) ||
        (historyOfBalls[5].active === true && button("KC")) ||
        (historyOfBalls[6].active === true && button("K7"))}
    </>
  );
}
function InputForCount({ name, handleZoneValue, zoneValue }) {
  return (
    <>
      <input
        type="text"
        className="inputForCount"
        name={name}
        onChange={handleZoneValue}
        value={zoneValue}
        required
      ></input>
    </>
  );
}
export function BallForAttack({
  attack,
  index,
  historyOfBalls,
  setHistoryOfBalls,
  setShowInputs,
  value,
  setShowBalls,
}) {
  const [showTheBall, setShowTheBall] = useState(true);
  function onClickSetCorrectBall(index) {
    const newBalls = [...historyOfBalls];
    if (showTheBall) {
      newBalls[index] = { ...newBalls[index], active: true };
      setShowInputs(true);
      setShowBalls(true);
      setShowTheBall(!showTheBall);
    } else {
      newBalls[index] = { ...newBalls[index], active: false };
      setShowInputs(false);
      setShowBalls(false);
      setShowTheBall(!showTheBall);
    }
    setHistoryOfBalls(newBalls);
  }
  return (
    <>
      <button
        type="button"
        className={attack}
        onClick={() => onClickSetCorrectBall(index)}
      >
        {value}
      </button>
    </>
  );
}
function AttackFields({ playerInfo }) {
  const [historyOfBalls, setHistoryOfBalls] = useState([
    { zone: "attackZone1", active: false },
    { zone: "attackZone2", active: false },
    { zone: "attackZone4", active: false },
    { zone: "attackPipe", active: false },
    { zone: "attackK1", active: false },
    { zone: "attackKC", active: false },
    { zone: "attackK7", active: false },
  ]);
  const [attackPercentageArray, setAttackPercentageArray] = useState([]);
  const [showInputs, setShowInputs] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [tip, setTip] = useState(0);
  const [saveDataOfAttacks, setSaveDataOfAttacks] = useState(false);
  const classNamesForConesAndInputs = [
    ["blue5A", "yellow5A", "purple5A", "red5A"],
    ["blue5B", "yellow5B", "purple5B", "red5B"],
    ["blue6A", "yellow6A", "purple6A", "red6A"],
    ["blue6B", "yellow6B", "purple6B", "red6B"],
    ["blue1A", "yellow1A", "purple1A", "red1A"],
    ["blue1B", "yellow1B", "purple1B", "red1B"],
  ];
  const classNamesForTip = ["tip", "yellowtip"];
  const [zoneValue, setZoneValue] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [diagrammValue, setDiagrammValue] = useState({
    winPoints: "",
    leftInGame: "",
    attacksInBlock: "",
    loosePoints: "",
  });
  function handleDiagrammValue(event) {
    setDiagrammValue({
      ...diagrammValue,
      [event.target.name]: event.target.value.replace(/\D+/g, ""),
    });
  }
  function handleZoneValue(event) {
    setZoneValue({
      ...zoneValue,
      [event.target.name]: event.target.value.replace(/\D+/g, ""),
    });
  }
  function onHandleCountClick(event) {
    event.preventDefault();
    let totalAtt = [];
    for (let key in zoneValue) {
      totalAtt.push(+zoneValue[key]);
    }
    if (saveDataOfAttacks) {
      playerInfo.winPoints = +diagrammValue.winPoints + playerInfo.winPoints;
      playerInfo.leftInGame = +diagrammValue.leftInGame + playerInfo.leftInGame;
      playerInfo.attacksInBlock =
        +diagrammValue.attacksInBlock + playerInfo.attacksInBlock;
      playerInfo.loosePoints =
        +diagrammValue.loosePoints + playerInfo.loosePoints;
      const zoneOfAtt = historyOfBalls.filter((ball) => ball.active);
      const PlayerAttHistory = playerInfo[zoneOfAtt[0].zone];
      const res = totalAtt.map((att, index) => att + PlayerAttHistory[index]);
      playerInfo[zoneOfAtt[0].zone] = res;
      savePlayer(playerInfo);
    }
    const new2 = totalAtt.reduce((a, b) => a + b, 0);
    const result = totalAtt.map((obj) => Math.round((obj / new2) * 100));
    const newObj = {
      ...zoneValue,
      1: result[0] + "%",
      2: result[1] + "%",
      3: result[2] + "%",
      4: result[3] + "%",
      5: result[4] + "%",
      6: result[5] + "%",
    };
    setZoneValue(newObj);
    setAttackPercentageArray(result);
    setShowInputs(!showInputs);
    setSaveDataOfAttacks(!saveDataOfAttacks);
  }
  return (
    <form className="playArea" onSubmit={onHandleCountClick}>
      <div className="zoneinput">
        {showInputs && (
          <input type="submit" className="countbutton" value="Count"></input>
        )}
        {!showInputs && (
          <input
            type="text"
            className="countbutton"
            defaultValue={
              historyOfBalls[0].active === true
                ? "Zone 2"
                : historyOfBalls[1].active === true
                ? "Zone 1"
                : historyOfBalls[2].active === true
                ? "Zone 4"
                : historyOfBalls[3].active === true
                ? "Pipe"
                : historyOfBalls[4].active === true
                ? "K1"
                : historyOfBalls[5].active === true
                ? "KC"
                : historyOfBalls[6].active === true
                ? "K7"
                : "Choose zone"
            }
          ></input>
        )}
        <input className="needtoclose"></input>
      </div>
      <div className="explain">
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
        <div className="comments">
          <label>Comments:</label>
          <textarea type="text" className="textcomment"></textarea>
        </div>
        <div className="saveBox">
          <input
            type="checkbox"
            className="saveButton"
            onClick={() => setSaveDataOfAttacks(!saveDataOfAttacks)}
          ></input>
          <div>
            <label>Save Attack</label>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <label
                style={
                  saveDataOfAttacks
                    ? {
                        backgroundColor: "greenyellow",
                        width: 45,
                        border: "4px solid black",
                      }
                    : {
                        backgroundColor: "orangered ",
                        width: 45,
                        border: "4px solid black",
                      }
                }
              >
                {saveDataOfAttacks ? "ON" : "OFF"}
              </label>
            </div>
          </div>
        </div>
        {saveDataOfAttacks && (
          <div style={{ marginTop: 10 }}>
            <label>Win points</label>
            <input
              style={{ backgroundColor: "lightgreen" }}
              name="winPoints"
              onChange={handleDiagrammValue}
              value={diagrammValue.winPoints}
            ></input>
            <label>Left in the game</label>
            <input
              style={{ backgroundColor: "yellow" }}
              name="leftInGame"
              onChange={handleDiagrammValue}
              value={diagrammValue.leftInGame}
            ></input>
            <label>Attacks in block</label>
            <input
              style={{ backgroundColor: "orange" }}
              name="attacksInBlock"
              onChange={handleDiagrammValue}
              value={diagrammValue.attacksInBlock}
            ></input>
            <label>Loose points</label>
            <input
              style={{ backgroundColor: "orangered" }}
              name="loosePoints"
              onChange={handleDiagrammValue}
              value={diagrammValue.loosePoints}
            ></input>
          </div>
        )}
      </div>
      <div>
        <input
          type="button"
          className={classNamesForTip[tip]}
          value="Tip"
          onClick={() => setTip((tip + 1) % 2)}
        ></input>
      </div>
      <div>
        {playerInfo.position === "Opposite"
          ? historyOfBalls
              .slice(0, 3)
              .map((ball, index) =>
                ball.active === false ? (
                  <BallForAttack
                    key={index}
                    value={ball.zone.replace(/[a-z]/g, "")}
                    attack={!showBalls ? ball.zone : "none"}
                    index={index}
                    historyOfBalls={historyOfBalls}
                    setHistoryOfBalls={setHistoryOfBalls}
                    setShowInputs={setShowInputs}
                    setShowBalls={setShowBalls}
                  />
                ) : (
                  <BallForAttack
                    key={index}
                    value="🏐"
                    attack={ball.zone + " showTheBall"}
                    index={index}
                    historyOfBalls={historyOfBalls}
                    setHistoryOfBalls={setHistoryOfBalls}
                    setShowInputs={setShowInputs}
                    setShowBalls={setShowBalls}
                  />
                )
              )
          : playerInfo.position === "Reciever"
          ? historyOfBalls
              .slice(1, 4)
              .map((ball, index) =>
                ball.active === false ? (
                  <BallForAttack
                    key={index + 1}
                    value={ball.zone.replace(/[a-z]/g, "")}
                    attack={!showBalls ? ball.zone : "none"}
                    index={index + 1}
                    historyOfBalls={historyOfBalls}
                    setHistoryOfBalls={setHistoryOfBalls}
                    setShowInputs={setShowInputs}
                    setShowBalls={setShowBalls}
                  />
                ) : (
                  <BallForAttack
                    key={index + 1}
                    value="🏐"
                    attack={ball.zone + " showTheBall"}
                    index={index + 1}
                    historyOfBalls={historyOfBalls}
                    setHistoryOfBalls={setHistoryOfBalls}
                    setShowInputs={setShowInputs}
                    setShowBalls={setShowBalls}
                  />
                )
              )
          : playerInfo.position === "MBlocker"
          ? historyOfBalls
              .slice(4, 7)
              .map((ball, index) =>
                ball.active === false ? (
                  <BallForAttack
                    key={index + 4}
                    value={ball.zone.replace(/[a-z]/g, "")}
                    attack={!showBalls ? ball.zone : "none"}
                    index={index + 4}
                    historyOfBalls={historyOfBalls}
                    setHistoryOfBalls={setHistoryOfBalls}
                    setShowInputs={setShowInputs}
                    setShowBalls={setShowBalls}
                  />
                ) : (
                  <BallForAttack
                    key={index + 4}
                    value="🏐"
                    attack={ball.zone + " showTheBall"}
                    index={index + 4}
                    historyOfBalls={historyOfBalls}
                    setHistoryOfBalls={setHistoryOfBalls}
                    setShowInputs={setShowInputs}
                    setShowBalls={setShowBalls}
                  />
                )
              )
          : null}
      </div>
      <div className="balls">
        {classNamesForConesAndInputs.map((el, index) => (
          <ConeReaction
            key={index}
            attackPercentageArray={attackPercentageArray[index]}
            range0={el[0]}
            range15={el[1]}
            range25={el[2]}
            range35={el[3]}
            historyOfBalls={historyOfBalls}
          />
        ))}
      </div>
      {showInputs && (
        <div>
          {classNamesForConesAndInputs.map((el, index) => (
            <InputForCount
              key={index}
              name={index + 1}
              handleZoneValue={handleZoneValue}
              zoneValue={zoneValue[index + 1]}
            />
          ))}
        </div>
      )}
      {!showInputs && (
        <div>
          <DefenderZone6 />
          <DefenderZone6 />
          <DefenderZone6 />
        </div>
      )}
    </form>
  );
}
function Attacks() {
  const navigate = useNavigate();
  const [history, sethistory] = useState([0]);
  const [searchparams] = useSearchParams();
  const playerId = searchparams.get("playerId");
  const players = useSelector((state) => state.listOfPlayers.listOfPlayers);
  const playerInfo = players[playerId - 1];
  function reset() {
    const newHistory = [...history];
    newHistory.splice(history.length - 1, 1);
    sethistory(newHistory);
  }
  function addField() {
    sethistory([...history, history.length]);
  }
  function goHome() {
    navigate("/");
  }
  return (
    <>
      <RegularLabel value={"Attack"} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {playerInfo && (
          <PersonalInformationOfPlayer
            player={playerInfo}
            onClick={() => goHome()}
          />
        )}
      </div>
      <div className="atackFileds">
        {history.map((field) =>
          field ? (
            <AttackFields key={field} playerInfo={playerInfo} />
          ) : (
            <div key={field}></div>
          )
        )}
        <div
          style={history.length > 1 ? { margin: "5px 0px 0px -100px" } : null}
        >
          {history.length > 1 && (
            <>
              <button className="reset" onClick={reset}>
                🡄
              </button>
            </>
          )}
          {history.length <= 3 && (
            <button className="reset" onClick={addField}>
              {history.length === 1 ? `Push to start` : `🡆`}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export default Attacks;