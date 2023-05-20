import { useState } from "react";
import { compare, reduce } from "../../Datas/api";
import { BallForAttack } from "./BallForAttack";
import { ConeReaction } from "./ConeReaction";
import { InputForCount } from "./InputForCount";
import { DefenderZone6 } from "./DefenderZone6";
import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../../states/reducers/playerInfoReducer";
import { setAllPlayers } from "../../states/reducers/listOfPlayersReducer";
import { Explain } from "./Explain";
import { CheckEquality } from "./CheckEquality";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { dataBase } from "../../config/firebase";

export function AttackFields() {
  const dispatch = useDispatch();
  const playersCollectionRefs = collection(dataBase, "players");
  const playerInfo = useSelector((state) => state.playerInfo);
  const allPlayers = useSelector((state) => state.listOfPlayers);
  const teams = useSelector((state) => state.listOfTeams);
  const [showInputs, setShowInputs] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [saveDataOfAttacks, setSaveDataOfAttacks] = useState(false);
  const [disableSwitch, setDisableSwitch] = useState(false);
  const [confirmReturn, setConfirmReturn] = useState(false);
  const [attackPercentageArray, setAttackPercentageArray] = useState([]);
  const [previousPlayerData, setPreviousPlayerData] = useState(null);
  const [previousTeamData, setPreviousTeamData] = useState(null);
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
  let AttacksByZone = Object.values(zoneValue);
  const checkEquality =
    diagrammValue.winPoints +
      diagrammValue.leftInGame +
      diagrammValue.attacksInBlock +
      diagrammValue.loosePoints ===
    reduce(AttacksByZone);
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
        diagrammValue.winPoints - (diagrammValue.attacksInBlock + diagrammValue.loosePoints);
    }
    obj.winPoints += diagrammValue.winPoints;
    obj.leftInGame += diagrammValue.leftInGame;
    obj.attacksInBlock += diagrammValue.attacksInBlock;
    obj.loosePoints += diagrammValue.loosePoints;
    obj.plusMinusOnAttack += diagrammValue.plusMinusOnAttack;
    obj.percentOfAttack = Math.round(
      (obj.winPoints /
        (obj.winPoints + obj.attacksInBlock + obj.loosePoints + obj.leftInGame + 0.0001)) *
        100
    );
    return obj;
  }
  function onHandleCountClick(event) {
    event.preventDefault();
    while (saveDataOfAttacks && !checkEquality) {
      alert("DATA Value not equal to ZONE value");
      return;
    }
    if (saveDataOfAttacks) {
      setConfirmReturn(!confirmReturn);
      setPreviousPlayerData({ ...playerInfo });
      setPreviousTeamData({
        ...teams.find((team) => team.name === playerInfo.teamid),
      });
      calculateForData(playerInfo);
      const zoneOfAtt = historyOfBalls.find((ball) => ball.active);
      const attHistory = playerInfo[zoneOfAtt.zone];
      const result = AttacksByZone.map((att, index) => att + attHistory[index]);
      const nameOfZone = zoneOfAtt.zone;
      const players = allPlayers.filter((player) => player.teamid === playerInfo.teamid);
      const team = teams.find((team) => team.name === playerInfo.teamid);
      const teamAge = players.reduce((a, b) => a + b.age, 0) / players.length;
      calculateForData(team);
      team.age = Math.round(teamAge);
      AttacksByZone = result;
      playerInfo[nameOfZone] = AttacksByZone;
      savePlayer(playerInfo); //сохраняю одного игрока
      saveTeam(team); // сохраняю команду
      setSaveDataOfAttacks(!saveDataOfAttacks);
      // console.log(team);
    }
    const totalAttacks = reduce(AttacksByZone, 0.0001);
    const result = AttacksByZone.map((attacks) => Math.round((attacks / totalAttacks) * 100));
    const upgradedZoneValue = Object.fromEntries(
      Object.entries(result).map(([key, value]) => [+key + 1, value + "%"])
    );
    setZoneValue(upgradedZoneValue);
    setAttackPercentageArray(result);
    setShowInputs(!showInputs);
    setDisableSwitch(!disableSwitch);
  }
  function returnOldData() {
    savePlayer(previousPlayerData);
    saveTeam(previousTeamData);
    setConfirmReturn(!confirmReturn);
    alert("Last Data Returned");
  }

  const savePlayer = async (player) => {
    try {
      const docRef = doc(dataBase, "players", player.id);
      await setDoc(docRef, player);
      const data = await getDocs(playersCollectionRefs);
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const listOfPlayers = [...list].sort((a, b) => compare(+a.id, +b.id));
      dispatch(setAllPlayers(listOfPlayers));
      dispatch(setInfoOfPlayer(listOfPlayers.find((players) => players.id === player.id)));
    } catch (error) {
      console.error(error);
    }
  };
  const saveTeam = async (team) => {
    try {
      const docRef = doc(dataBase, "clubs", team.id);
      await setDoc(docRef, team);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="playArea" onSubmit={onHandleCountClick}>
      <div className="zoneinput">
        <input
          type="submit"
          className="countbutton"
          value={showInputs ? "Count" : !showBalls ? "Choose Zone" : "Close"}
          disabled={!showInputs}
        ></input>
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
          type={"Attack"}
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
                    showInputs={showInputs}
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
                    showInputs={showInputs}
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
                    showInputs={showInputs}
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
                    showInputs={showInputs}
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
                    showInputs={showInputs}
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
                    showInputs={showInputs}
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
            type={"Attack"}
          />
        ))}
      </div>
      {showBalls && (
        <>
          <div>
            <DefenderZone6 />
            <DefenderZone6 />
            <DefenderZone6 />
          </div>
          <div>
            {classNamesForConesAndInputs.map((el, index) => (
              <InputForCount
                key={index}
                name={index + 1}
                onChange={handleZoneValue}
                zoneValue={zoneValue[index + 1]}
                showInputs={showInputs}
              />
            ))}
          </div>
          {saveDataOfAttacks && (
            <CheckEquality
              zoneValue={zoneValue}
              diagrammValue={diagrammValue}
              checkEquality={checkEquality}
            />
          )}
        </>
      )}
    </form>
  );
}
