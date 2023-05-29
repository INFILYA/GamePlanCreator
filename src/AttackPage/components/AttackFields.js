import { useState } from "react";
import { reduce } from "../../Datas/api";
import { BallForAttack } from "./BallForAttack";
import { ConeReaction } from "./ConeReaction";
import { InputForCount } from "./InputForCount";
import { DefenderZone6 } from "./DefenderZone6";
import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../../states/reducers/playerInfoReducer";
import { setAllPlayers, upgradeAge } from "../../states/reducers/listOfPlayersReducer";
import { Explain } from "./Explain";
import { CheckEquality } from "./CheckEquality";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { dataBase } from "../../config/firebase";
import { setAllTeams } from "../../states/reducers/listOfTeamsReducer";
import { setUserVersion } from "../../states/reducers/userVersionReducer";

export function AttackFields() {
  const dispatch = useDispatch();
  const playersCollectionRefs = collection(dataBase, "players");
  const clubsCollectionRefs = collection(dataBase, "clubs");
  const userVersion = useSelector((state) => state.userVersion);
  const playerInfo = useSelector((state) => state.playerInfo);
  const allPlayers = useSelector((state) => state.listOfPlayers);
  const teams = useSelector((state) => state.listOfTeams);
  const [showDataOfAttacks, setShowDataOfAttacks] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [saveDataOfAttacks, setSaveDataOfAttacks] = useState(false);
  const [disableSwitch, setDisableSwitch] = useState(false);
  const [confirmReturn, setConfirmReturn] = useState(false);
  const [attackPercentageArray, setAttackPercentageArray] = useState([]);
  const [previousPlayerData, setPreviousPlayerData] = useState(null);
  const [previousTeamData, setPreviousTeamData] = useState(null);
  const [tip4, setTip4] = useState(0);
  const [tip2, setTip2] = useState(0);
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
  const classNamesForTip4 = ["tip4", "yellowtip4"];
  const classNamesForTip2 = ["tip2", "yellowtip2"];
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
      const upgradedPlayers = players.map((player) => upgradeAge(player));
      const teamAge = upgradedPlayers.reduce((a, b) => a + b.age, 0) / players.length;
      const teamHeight = upgradedPlayers.reduce((a, b) => a + b.height, 0) / players.length;
      calculateForData(team);
      team.age = +teamAge.toFixed(1);
      team.height = +teamHeight.toFixed(1);
      AttacksByZone = result;
      playerInfo[nameOfZone] = AttacksByZone;
      refreshVersionOFAdmin(1); //перезаписываю версию
      savePlayer(playerInfo); //сохраняю одного игрока
      saveTeam(team); // сохраняю команду
      setSaveDataOfAttacks(!saveDataOfAttacks);
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
    refreshVersionOFAdmin(-1); //откатываю версию
    savePlayer(previousPlayerData); //лткатываю данные одного игрока
    saveTeam(previousTeamData); // откатываю данные команды
    setConfirmReturn(!confirmReturn);
    alert("Last Data Returned");
  }

  function showData(event) {
    event.preventDefault();
    const zoneOfAtt = historyOfBalls.find((ball) => ball.active);
    const attHistory = playerInfo[zoneOfAtt.zone];
    const totalAttacks = reduce(attHistory, 0.0001);
    const result = attHistory.map((attacks) => Math.round((attacks / totalAttacks) * 100));
    const upgradedZoneValue = Object.fromEntries(
      Object.entries(result).map(([key, value]) => [+key + 1, value + "%"])
    );
    setZoneValue(upgradedZoneValue);
    setAttackPercentageArray(result);
    setShowInputs(!showInputs);
    setDisableSwitch(!disableSwitch);
    setShowDataOfAttacks(!showDataOfAttacks);
  }

  const refreshVersionOFAdmin = async (count) => {
    try {
      const docVersionRef = doc(dataBase, "versionChecker", "currentVersion");
      await setDoc(docVersionRef, { currentVersion: userVersion + count });
      dispatch(setUserVersion(userVersion + count));
    } catch (error) {
      console.error(error);
    }
  };

  const savePlayer = async (player) => {
    try {
      const docPlayerRef = doc(dataBase, "players", player.id);
      await setDoc(docPlayerRef, player);
      const data = await getDocs(playersCollectionRefs);
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setAllPlayers(list));
      dispatch(setInfoOfPlayer(list.find((players) => players.id === player.id)));
    } catch (error) {
      console.error(error);
    }
  };
  const saveTeam = async (team) => {
    try {
      const docTeamRef = doc(dataBase, "clubs", team.id);
      await setDoc(docTeamRef, team);
      const data = await getDocs(clubsCollectionRefs);
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setAllTeams(list));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="playArea" onSubmit={!showDataOfAttacks ? onHandleCountClick : showData}>
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
          showDataOfAttacks={showDataOfAttacks}
          setShowDataOfAttacks={setShowDataOfAttacks}
          type={"Attack"}
        />
      </div>
      <div>
        <input
          type="button"
          className={classNamesForTip4[tip2]}
          value="Tip"
          onClick={() => setTip2((tip2 + 1) % 2)}
        ></input>
      </div>
      <div>
        <input
          type="button"
          className={classNamesForTip2[tip4]}
          value="Tip"
          onClick={() => setTip4((tip4 + 1) % 2)}
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
          {!showDataOfAttacks && (
            <div style={{ display: "contents" }}>
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
          )}
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
