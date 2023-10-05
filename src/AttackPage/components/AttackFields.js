import { useEffect, useState } from "react";
import { reduce } from "../../Datas/api";
import { BallForAttack } from "./inner components/BallForAttack";
import { ConeReaction } from "./inner components/ConeReaction";
import { InputForCount } from "./inner components/InputForCount";
import { DefenderZone6 } from "./inner components/DefenderZone6";
import { useDispatch, useSelector } from "react-redux";
import { upgradeAge } from "../../StaticHelpModules/Button";
import { Explain } from "./inner components/Explain";
import { CheckEquality } from "./inner components/CheckEquality";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { dataBase } from "../../config/firebase";
import { setUserVersion } from "../../states/slices/userVersionSlice";
import { setAllPlayers } from "../../states/slices/listOfPlayersSlice";
import { setInfoOfPlayer } from "../../states/slices/playerInfoSlice";
import { setAllTeams } from "../../states/slices/listOfTeamsSlice";
import Tip from "./inner components/Tip";
import SectionWrapper from "../../Page1/components/SectionWrapper";

export function AttackFields() {
  const dispatch = useDispatch();
  const playersCollectionRefs = collection(dataBase, "players");
  const clubsCollectionRefs = collection(dataBase, "clubs");
  const userVersion = useSelector((state) => state.userVersion.userVersion);
  const playerInfos = useSelector((state) => state.playerInfo.playerInfo);
  const allPlayers = useSelector((state) => state.listOfPlayers.listOfPlayers);
  const allTeams = useSelector((state) => state.listOfTeams.listOfTeams);
  const playerInfo = { ...playerInfos };
  const [showDataOfAttacks, setShowDataOfAttacks] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [saveDataOfAttacks, setSaveDataOfAttacks] = useState(false);
  const [disableSwitch, setDisableSwitch] = useState(false);
  const [confirmReturn, setConfirmReturn] = useState(false);
  const [previousPlayerData, setPreviousPlayerData] = useState(null);
  const [previousTeamData, setPreviousTeamData] = useState(null);
  const [attackType, setattackType] = useState("choose");
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
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [diagrammValue, setDiagrammValue] = useState({
    winPoints: 0,
    leftInGame: 0,
    attacksInBlock: 0,
    loosePoints: 0,
    plusMinusOnAttack: 0,
    percentOfAttack: 0,
  });
  const classNamesForConesAndInputs = ["5A", "5B", "6A", "6B", "1A", "1B"];
  let AttacksByZone = Object.values(zoneValue);
  let DiagrammValue = Object.values(diagrammValue).slice(0, 4);
  const checkEquality = reduce(DiagrammValue) === reduce(AttacksByZone);

  useEffect(() => {
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo"));
    dispatch(setInfoOfPlayer(playerInfo));
  }, [dispatch]);

  const chooseTypeOfAttack = (event) => {
    setattackType(event.target.value);
  };
  const handleDiagrammValue = (event) => {
    setDiagrammValue({
      ...diagrammValue,
      [event.target.name]: +event.target.value.replace(/\D+/g, ""),
    });
  };
  const handleZoneValue = (event) => {
    setZoneValue({
      ...zoneValue,
      [event.target.name]: +event.target.value.replace(/\D+/g, ""),
    });
  };
  const calculateForDatas = (obj) => {
    if (obj === playerInfo) {
      diagrammValue.plusMinusOnAttack =
        diagrammValue.winPoints - (diagrammValue.attacksInBlock + diagrammValue.loosePoints);
    }
    for (let key in diagrammValue) {
      if (key === "percentOfAttack") {
        continue;
      }
      obj[key] += diagrammValue[key];
    }
    obj.percentOfAttack = Math.round(
      (obj.winPoints /
        (obj.winPoints + obj.attacksInBlock + obj.loosePoints + obj.leftInGame + 0.0001)) *
        100
    );
    return obj;
  };

  const onHandleCountClick = (event) => {
    event.preventDefault();
    while (attackType === "choose") {
      alert("Type of Attack was not selected");
      return;
    }
    if (saveDataOfAttacks) {
      while (!checkEquality) {
        alert("DATA Value not equal to ZONE value");
        return;
      }
      setConfirmReturn(!confirmReturn);
      setPreviousPlayerData({ ...playerInfo });
      setPreviousTeamData({
        ...allTeams.find((team) => team.name === playerInfo.teamid),
      });
      calculateForDatas(playerInfo);
      const zoneOfAtt = historyOfBalls.find((ball) => ball.active);
      const attHistory = playerInfo[zoneOfAtt.zone + attackType];
      const result = AttacksByZone.map((att, index) => att + attHistory[index]);
      const nameOfZone = zoneOfAtt.zone + attackType;
      const players = allPlayers.filter((player) => player.teamid === playerInfo.teamid);
      const team = allTeams.find((team) => team.name === playerInfo.teamid);
      const upgradedPlayers = players.map((player) => upgradeAge(player));
      const teamAge = upgradedPlayers.reduce((a, b) => a + b.age, 0) / players.length;
      const teamHeight = upgradedPlayers.reduce((a, b) => a + b.height, 0) / players.length;
      const newTeam = { ...team };
      calculateForDatas(newTeam);
      newTeam.age = +teamAge.toFixed(1);
      newTeam.height = +teamHeight.toFixed(1);
      AttacksByZone = result;
      playerInfo[nameOfZone] = AttacksByZone;
      refreshVersionOFAdmin(1); //перезаписываю версию
      savePlayer(playerInfo); //сохраняю одного игрока
      saveTeam(newTeam); // сохраняю команду
      setSaveDataOfAttacks(!saveDataOfAttacks);
    }
    const totalAttacks = reduce(AttacksByZone, 0.0001);
    const result = AttacksByZone.map((attacks) => Math.round((attacks / totalAttacks) * 100));
    setZoneValue(result);
    setShowInputs(!showInputs);
    setDisableSwitch(!disableSwitch);
  };
  const returnOldData = () => {
    refreshVersionOFAdmin(-1); //откатываю версию
    savePlayer(previousPlayerData); //откатываю данные одного игрока
    saveTeam(previousTeamData); // откатываю данные команды
    setConfirmReturn(!confirmReturn);
    alert("Last Data Returned");
  };

  const showData = (event) => {
    event.preventDefault();
    if (attackType === "choose") {
      alert("Type of Attack was not selected");
      return;
    }
    const zoneOfAtt = historyOfBalls.find((ball) => ball.active);
    const attHistory = playerInfo[zoneOfAtt.zone + attackType];
    const totalAttacks = reduce(attHistory, 0.0001);
    const result = attHistory.map((attacks) => Math.round((attacks / totalAttacks) * 100));
    setZoneValue(result);
    setShowInputs(!showInputs);
    setDisableSwitch(!disableSwitch);
    setShowDataOfAttacks(!showDataOfAttacks);
  };

  const refreshVersionOFAdmin = async (count) => {
    try {
      const version = doc(dataBase, "versionChecker", "currentVersion");
      await setDoc(version, { currentVersion: userVersion + count });
      const adminVersion = userVersion + count;
      dispatch(setUserVersion(adminVersion));
    } catch (error) {
      console.error(error);
    }
  };

  const savePlayer = async (player) => {
    try {
      const Player = doc(dataBase, "players", player.id);
      await setDoc(Player, player);
      const data = await getDocs(playersCollectionRefs);
      const playersList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setAllPlayers(playersList));
      dispatch(setInfoOfPlayer(player));
    } catch (error) {
      console.error(error);
    }
  };
  const saveTeam = async (team) => {
    try {
      const Team = doc(dataBase, "clubs", team.id);
      await setDoc(Team, team);
      const data = await getDocs(clubsCollectionRefs);
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setAllTeams(list));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SectionWrapper
      className={"playArea-section"}
      backGround={
        <div className="playground-area-background">
          <div className="threeMRivalCort"></div>
          <div className="threeMMyCort"></div>
        </div>
      }
      content={
        <form className="playArea" onSubmit={!showDataOfAttacks ? onHandleCountClick : showData}>
          <div className="explain">
            <Explain
              confirmReturn={confirmReturn}
              setConfirmReturn={setConfirmReturn}
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
          <div className="select-wrapper">
            <select
              className="typeOfAction"
              onChange={chooseTypeOfAttack}
              disabled={!showInputs || disableSwitch}
            >
              <option value="choose">{!showInputs ? `Choose zone` : `Choose type`}</option>
              <option value="FastBall">Fast ball</option>
              {playerInfo.position !== "MBlocker" && <option value="HighBall">High ball</option>}
            </select>
          </div>
          <div className="count-button-wrapper">
            <button type="submit" className="countButton" disabled={!showInputs || disableSwitch}>
              Count
            </button>
          </div>
          <div className="zones-wrapper">
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
          {disableSwitch && !showDataOfAttacks && (
            <div className="cones-wrapper">
              {classNamesForConesAndInputs.map((el, index) => (
                <ConeReaction
                  key={index}
                  zoneValue={zoneValue[index]}
                  cone={el}
                  historyOfBalls={historyOfBalls}
                  type={"Attack"}
                />
              ))}
            </div>
          )}
          {showBalls && (
            <>
              <div className="tip-wrapper">
                <Tip value={"Tip"} />
                <Tip value={"Tip"} />
                <Tip value={"Tip"} />
              </div>
              <div className="defender-wrapper">
                <DefenderZone6 />
                <DefenderZone6 />
                <DefenderZone6 />
              </div>
              {!disableSwitch && !showDataOfAttacks && (
                <div className="inputs-wrapper">
                  {classNamesForConesAndInputs.map((el, index) => (
                    <InputForCount
                      key={el}
                      name={index}
                      onChange={handleZoneValue}
                      zoneValue={zoneValue[index]}
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
      }
    />
  );
}
