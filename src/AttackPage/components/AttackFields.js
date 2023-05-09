import { useState } from "react";
import { savePlayer, saveTeam } from "../../Datas/api";
import { Switch } from "antd";
import { BallForAttack } from "./BallForAttack";
import { ConeReaction } from "./ConeReaction";
import { InputForCount } from "./InputForCount";
import { DefenderZone6 } from "./DefenderZone6";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayerInfo } from "../../states/reducers/playerInfoReducer";
import { fetchPlayers } from "../../states/reducers/listOfPlayersReducer";

export function AttackFields() {
  const dispatch = useDispatch();
  const playerInfo = useSelector((state) => state.playerInfo);
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
  const listOfTeams = useSelector((state) => state.listOfTeams);
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
  const [disableSwitch, setDisableSwitch] = useState(false);
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
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });
  const [diagrammValue, setDiagrammValue] = useState({
    winPoints: 0,
    leftInGame: 0,
    attacksInBlock: 0,
    loosePoints: 0,
    plusMinusOnAttack: 0,
    plusMinusOnService: 0,
    percentOfAttack: 0,
  });
  function handleDiagrammValue(event) {
    setDiagrammValue({
      ...diagrammValue,
      [event.target.name]: +event.target.value.replace(/\D+/g, ""),
    });
  }
  function handleZoneValue(event) {
    setZoneValue({
      ...zoneValue,
      [event.target.name]: +event.target.value.replace(/\D+/g, ""),
    });
  }
  function calculateForData(obj) {
    if (obj === playerInfo) {
      diagrammValue.plusMinusOnAttack =
        +diagrammValue.winPoints -
        (+diagrammValue.attacksInBlock + +diagrammValue.loosePoints);
    }
    obj.winPoints += +diagrammValue.winPoints;
    obj.leftInGame += +diagrammValue.leftInGame;
    obj.attacksInBlock += +diagrammValue.attacksInBlock;
    obj.loosePoints += +diagrammValue.loosePoints;
    obj.plusMinusOnAttack += +diagrammValue.plusMinusOnAttack;
    obj.percentOfAttack = Math.round(
      (obj.winPoints /
        (obj.winPoints +
          obj.attacksInBlock +
          obj.loosePoints +
          obj.leftInGame)) *
        100
    );
    return obj;
  }
  async function onHandleCountClick(event) {
    event.preventDefault();
    let totalAtt = Object.values(zoneValue);
    if (saveDataOfAttacks) {
      calculateForData(playerInfo);
      const zoneOfAtt = historyOfBalls.filter((ball) => ball.active);
      const PlayerAttHistory = playerInfo[zoneOfAtt[0].zone];
      const res = totalAtt.map((att, index) => att + PlayerAttHistory[index]);
      const nameOfZone = zoneOfAtt[0].zone;
      const players = listOfPlayers.filter(
        (player) => player.teamid === playerInfo.teamid
      );
      const team = listOfTeams.find((team) => team.name === playerInfo.teamid);
      const teamAge = players.reduce((a, b) => a + b.age, 0) / players.length;
      calculateForData(team);
      team.age = +teamAge.toFixed(1);
      totalAtt = res;
      playerInfo[nameOfZone] = totalAtt;
      await savePlayer(playerInfo);
      await saveTeam(team);
      dispatch(fetchPlayerInfo(playerInfo));
      dispatch(fetchPlayers());
      setDisableSwitch(!disableSwitch);
      setSaveDataOfAttacks(!saveDataOfAttacks);
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
            disabled={true}
            defaultValue={
              historyOfBalls[0].active === true
                ? "Zone 1"
                : historyOfBalls[1].active === true
                ? "Zone 2"
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
        <label style={{ fontSize: 30 }}>
          {disableSwitch ? "Data Saved" : "Add Data"}
        </label>
        <div className="saveBox">
          <Switch
            onChange={() => setSaveDataOfAttacks(!saveDataOfAttacks)}
            disabled={disableSwitch}
          />
        </div>
        {saveDataOfAttacks && (
          <div style={{ marginTop: 10 }}>
            <input
              style={{ backgroundColor: "lightgreen" }}
              name="winPoints"
              onChange={handleDiagrammValue}
              value={diagrammValue.winPoints}
              placeholder="Win"
              required
            ></input>
            <input
              style={{ backgroundColor: "yellow" }}
              name="leftInGame"
              onChange={handleDiagrammValue}
              value={diagrammValue.leftInGame}
              placeholder="Left"
              required
            ></input>
            <input
              style={{ backgroundColor: "orange" }}
              name="attacksInBlock"
              onChange={handleDiagrammValue}
              value={diagrammValue.attacksInBlock}
              placeholder="block"
              required
            ></input>
            <input
              style={{ backgroundColor: "orangered" }}
              name="loosePoints"
              onChange={handleDiagrammValue}
              value={diagrammValue.loosePoints}
              placeholder="Loose"
              required
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
