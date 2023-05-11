import { useState } from "react";
import { savePlayer, saveTeam } from "../../Datas/api";
import { BallForAttack } from "./BallForAttack";
import { ConeReaction } from "./ConeReaction";
import { InputForCount } from "./InputForCount";
import { DefenderZone6 } from "./DefenderZone6";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayerInfo } from "../../states/reducers/playerInfoReducer";
import { fetchPlayers } from "../../states/reducers/listOfPlayersReducer";
import { fetchTeams } from "../../states/reducers/listOfTeamsReducer";
import { Explain } from "./Explain";

export function AttackFields() {
  const dispatch = useDispatch();
  const playerInfo = useSelector((state) => state.playerInfo);
  const allPlayers = useSelector((state) => state.listOfPlayers);
  const teams = useSelector((state) => state.listOfTeams);
  const [showInputs, setShowInputs] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [saveDataOfAttacks, setSaveDataOfAttacks] = useState(false);
  const [disableSwitch, setDisableSwitch] = useState(false);
  const [confirmReturn, setConfirmReturn] = useState(false);
  const [attackPercentageArray, setAttackPercentageArray] = useState([]);
  const [previousPlayerHistory, setPreviousPlayerHistory] = useState(null);
  const [previousTeamHistory, setPreviousTeamHistory] = useState(null);
  const [tip, setTip] = useState(0);
  const [historyOfBalls, setHistoryOfBalls] = useState([
    { zone: "attackZone1", active: false },
    { zone: "attackZone2", active: false },
    { zone: "attackZone4", active: false },
    { zone: "attackPipe", active: false },
    { zone: "attackK1", active: false },
    { zone: "attackKC", active: false },
    { zone: "attackK7", active: false },
  ]);
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
    percentOfAttack: 0,
  });
  const classNamesForConesAndInputs = [
    ["blue5A", "yellow5A", "purple5A", "red5A"],
    ["blue5B", "yellow5B", "purple5B", "red5B"],
    ["blue6A", "yellow6A", "purple6A", "red6A"],
    ["blue6B", "yellow6B", "purple6B", "red6B"],
    ["blue1A", "yellow1A", "purple1A", "red1A"],
    ["blue1B", "yellow1B", "purple1B", "red1B"],
  ];
  const classNamesForTip = ["tip", "yellowtip"];
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
    let AttacksByZone = Object.values(zoneValue);
    if (saveDataOfAttacks) {
      setConfirmReturn(!confirmReturn);
      setPreviousPlayerHistory({ ...playerInfo });
      setPreviousTeamHistory({
        ...teams.find((team) => team.name === playerInfo.teamid),
      });
      calculateForData(playerInfo);
      const zoneOfAtt = historyOfBalls.find((ball) => ball.active);
      const attHistory = playerInfo[zoneOfAtt.zone];
      const res = AttacksByZone.map((att, index) => att + attHistory[index]);
      const nameOfZone = zoneOfAtt.zone;
      const players = allPlayers.filter(
        (player) => player.teamid === playerInfo.teamid
      );
      const team = teams.find((team) => team.name === playerInfo.teamid);
      const teamAge = players.reduce((a, b) => a + b.age, 0) / players.length;
      calculateForData(team);
      team.age = +teamAge.toFixed(1);
      AttacksByZone = res;
      playerInfo[nameOfZone] = AttacksByZone;
      await savePlayer(playerInfo); //сохраняю одного игрока
      await saveTeam(team); // сохраняю команду
      dispatch(fetchPlayerInfo(playerInfo)); // обвновляю инфу игрока
      dispatch(fetchPlayers()); // обновляю  всех игроков
      setDisableSwitch(!disableSwitch);
      setSaveDataOfAttacks(!saveDataOfAttacks);
    }
    const totalAttacks = AttacksByZone.reduce((a, b) => a + b, 0);
    const result = AttacksByZone.map((attacks) =>
      Math.round((attacks / totalAttacks) * 100)
    );
    const upgradedZoneValue = {
      1: result[0] + "%",
      2: result[1] + "%",
      3: result[2] + "%",
      4: result[3] + "%",
      5: result[4] + "%",
      6: result[5] + "%",
    };
    setZoneValue(upgradedZoneValue);
    setAttackPercentageArray(result);
    setShowInputs(!showInputs);
  }
  async function returnOldData() {
    await savePlayer(previousPlayerHistory);
    await saveTeam(previousTeamHistory);
    dispatch(fetchPlayerInfo(previousPlayerHistory));
    dispatch(fetchPlayers());
    dispatch(fetchTeams());
    setConfirmReturn(!confirmReturn);
    alert("Last Data Returned");
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
        <Explain
          confirmReturn={confirmReturn}
          disableSwitch={disableSwitch}
          saveDataOfAttacks={saveDataOfAttacks}
          setSaveDataOfAttacks={setSaveDataOfAttacks}
          diagrammValue={diagrammValue}
          handleDiagrammValue={handleDiagrammValue}
          returnOldData={returnOldData}
          type={'Attack'}
        />
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
