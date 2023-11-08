import { useState } from "react";
import { reduce } from "../../Datas/api";
import { BallForAttack } from "./inner components/BallForAttack";
import { ConeReaction } from "./inner components/ConeReaction";
import { InputForCount } from "./inner components/InputForCount";
import { useDispatch, useSelector } from "react-redux";
import { upgradeAge } from "../../StaticHelpModules/Button";
import { Explain } from "./inner components/Explain";
import { CheckEquality } from "./inner components/CheckEquality";
import { doc, setDoc } from "firebase/firestore";
import { dataBase } from "../../config/firebase";
import { setUserVersion } from "../../states/slices/userVersionSlice";
import { setAllPlayers } from "../../states/slices/listOfPlayersSlice";
import { setInfoOfPlayer } from "../../states/slices/playerInfoSlice";
import { setAllTeams } from "../../states/slices/listOfTeamsSlice";
import SectionWrapper from "../../Page1/components/SectionWrapper";
import { resetRivalPlayers } from "../../states/slices/rivalPlayersSlice";
import { resetMyTeamPlayers } from "../../states/slices/myTeamPlayersSlice";

export default function WrapperForFields({
  diagrammValue,
  setDiagrammValue,
  calculateForData,
  zonesStates,
  setZonesStates,
  playerInfo,
  type,
}) {
  const dispatch = useDispatch();
  const userVersion = useSelector((state) => state.userVersion.userVersion);
  const allPlayers = useSelector((state) => state.listOfPlayers.listOfPlayers);
  const allTeams = useSelector((state) => state.listOfTeams.listOfTeams);
  const rivalPlayers = useSelector((state) => state.rivalPlayers.rivalPlayers);
  const myTeamPlayers = useSelector((state) => state.myTeamPlayers.myTeamPlayers);
  const [showDataOfActions, setShowDataOfActions] = useState(false);
  const [saveDataOfActions, setSaveDataOfActions] = useState(false);
  const [previousPlayerData, setPreviousPlayerData] = useState(null);
  const [previousTeamData, setPreviousTeamData] = useState(null);
  const [showInputs, setShowInputs] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [disableSwitch, setDisableSwitch] = useState(false);
  const [confirmReturn, setConfirmReturn] = useState(false);
  const [actionType, setActionType] = useState("choose");
  const [zoneValue, setZoneValue] = useState({
    "4A": 0,
    "4B": 0,
    "3A": 0,
    "3B": 0,
    "2A": 0,
    "2B": 0,
    "4C": 0,
    "4D": 0,
    "3C": 0,
    "3D": 0,
    "2C": 0,
    "2D": 0,
    "9A": 0,
    "9B": 0,
    "8A": 0,
    "8B": 0,
    "7A": 0,
    "7B": 0,
    "9C": 0,
    "9D": 0,
    "8C": 0,
    "8D": 0,
    "7C": 0,
    "7D": 0,
    "5A": 0,
    "5B": 0,
    "6A": 0,
    "6B": 0,
    "1A": 0,
    "1B": 0,
    "5C": 0,
    "5D": 0,
    "6C": 0,
    "6D": 0,
    "1C": 0,
    "1D": 0,
  });
  let loadByZone = Object.values(zoneValue);
  let DiagrammValue = Object.values(diagrammValue).slice(0, 4);
  const checkEquality = reduce(DiagrammValue) === reduce(loadByZone);

  const chooseTypeOfAttack = (event) => {
    setActionType(event.target.value);
  };
  const handleDiagrammValue = (event) => {
    setDiagrammValue({
      ...diagrammValue,
      [event.target.name]: +event.target.value.replace(/\D+/g, ""),
    });
  };
  const onHandleCountClick = (event) => {
    event.preventDefault();
    while (actionType === "choose") {
      // якщо не вибарно тип атаки то return
      alert("Type of Action was not selected");
      return;
    }
    if (saveDataOfActions) {
      // якщо додаємо данні і кількість атак не співпадає з описаними атаками то return
      while (!checkEquality) {
        alert("DATA Value not equal to ZONE value");
        return;
      }
      setConfirmReturn(!confirmReturn);
      setPreviousPlayerData({ ...playerInfo }); // зберігаємо попередні дані гравця і команд
      setPreviousTeamData({
        ...allTeams.find((team) => team.name === playerInfo.teamid),
      });
      calculateForData(playerInfo); // додаємо полі діаграмм до значень обраного гравця
      const zoneOfAction = zonesStates.find((ball) => ball.active); // визначаємо з якої зона атака
      const actionHistory = playerInfo[zoneOfAction.zone + actionType]; // дістаємо данні гравця з конкретної зони
      const nameOfZone = zoneOfAction.zone + actionType; // назва зони атаки
      const players = allPlayers.filter((player) => player.teamid === playerInfo.teamid); // знаходимо одноклубників обраного гравця
      const team = allTeams.find((team) => team.name === playerInfo.teamid); // знаходимо команду обраного гравця
      const upgradedPlayers = players.map((player) => upgradeAge(player)); // оновлюємо точний вік гравців команди обраного гравця
      const teamAge = upgradedPlayers.reduce((a, b) => a + b.age, 0) / players.length; // середній вік гравців обраної команди
      const teamHeight = upgradedPlayers.reduce((a, b) => a + b.height, 0) / players.length; // середній зріст гравців обраної команди
      const newTeam = { ...team };
      calculateForData(newTeam); // додаємо полі діаграмм до значень команди обраного гравця
      newTeam.age = +teamAge.toFixed(1); // встановлюємо правильний вік
      newTeam.height = +teamHeight.toFixed(1); // встановлюємо правильний зріст
      playerInfo[nameOfZone] = loadByZone.map(
        (att, index) => att + (actionHistory[index] === undefined ? 0 : actionHistory[index])
      ); // оновлюємо поля атаки у обраного гравця
      refreshVersionOFAdmin(1); //перезаписываю версию
      savePlayer(playerInfo); //сохраняю одного игрока
      saveTeam(newTeam); // сохраняю команду
      setSaveDataOfActions(!saveDataOfActions);
    }
    const totalAttacks = reduce(loadByZone, 0.0001);
    const result = loadByZone.map((attacks) => Math.round((attacks / totalAttacks) * 100));
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
    if (actionType === "choose") {
      alert("Type of Action was not selected");
      return;
    }
    const zoneOfAtt = zonesStates.find((ball) => ball.active);
    const attHistory = playerInfo[zoneOfAtt.zone + actionType];
    const totalAttacks = reduce(attHistory, 0.0001);
    const result = attHistory.map((attacks) => Math.round((attacks / totalAttacks) * 100));
    setZoneValue(result);
    setShowInputs(!showInputs);
    setDisableSwitch(!disableSwitch);
    setShowDataOfActions(!showDataOfActions);
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
      const Player = doc(dataBase, "players", player.name);
      await setDoc(Player, player);
      const players = allPlayers.map((athlete) => (athlete.name === player.name ? player : athlete));
      dispatch(setAllPlayers(players));
      dispatch(setInfoOfPlayer(player));
      if (rivalPlayers.length !== 0 && rivalPlayers?.[0].teamid === player.teamid) {
        dispatch(
          resetRivalPlayers(
            rivalPlayers.map((athlete) => (athlete.name === player.name ? player : athlete))
          )
        );
      }
      if (myTeamPlayers.length !== 0 && myTeamPlayers?.[0].teamid === player.teamid) {
        dispatch(
          resetMyTeamPlayers(
            myTeamPlayers.map((athlete) => (athlete.name === player.name ? player : athlete))
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const saveTeam = async (team) => {
    try {
      const Team = doc(dataBase, "clubs", team.id);
      await setDoc(Team, team);
      const teams = allTeams.map((squad) => (squad.id === team.id ? team : squad));
      dispatch(setAllTeams(teams));
    } catch (error) {
      console.error(error);
    }
  };
  const choosenActionOne = type === "Attack" ? "FastBall" : "Jump";
  const choosenActionTwo = type === "Attack" ? "HighBall" : "Float";
  function totalPercentOfzone(number1, number2) {
    return zoneValue
      .filter((value, index) => index % 6 === number1 || index % 6 === number2)
      .reduce((a, b) => a + b);
  }
  const zone5 = Array.isArray(zoneValue) ? totalPercentOfzone(0, 1) : null;
  const zone6 = Array.isArray(zoneValue) ? totalPercentOfzone(2, 3) : null;
  const zone1 = Array.isArray(zoneValue) ? totalPercentOfzone(4, 5) : null;
  function setStyle(zone) {
    return zone >= 50 ? { backgroundColor: "orangered", color: "white" } : {};
  }
  return (
    <SectionWrapper
      className="playArea-section"
      backGround={
        <div className="playground-area-background">
          <div className="threeMRivalCort">
            {Array.isArray(zoneValue) && (
              <>
                <div style={setStyle(zone5)}>{zone5}%</div>
                <div style={setStyle(zone6)}>{zone6}%</div>
                <div style={setStyle(zone1)}>{zone1}%</div>
              </>
            )}
          </div>
          <div className="threeMMyCort"></div>
        </div>
      }
      content={
        <>
          <form className="playArea" onSubmit={!showDataOfActions ? onHandleCountClick : showData}>
            <div className="explain">
              <Explain
                confirmReturn={confirmReturn}
                setConfirmReturn={setConfirmReturn}
                disableSwitch={disableSwitch}
                saveDataOfActions={saveDataOfActions}
                setSaveDataOfActions={setSaveDataOfActions}
                diagrammValue={diagrammValue}
                handleDiagrammValue={handleDiagrammValue}
                returnOldData={returnOldData}
                showDataOfActions={showDataOfActions}
                setShowDataOfActions={setShowDataOfActions}
                type={type}
              />
            </div>
            <div className="select-wrapper">
              <select
                className="typeOfAction"
                onChange={chooseTypeOfAttack}
                disabled={!showInputs || disableSwitch}
              >
                <option value="choose">{!showInputs ? `Choose zone` : `Choose type`}</option>
                <option value={choosenActionOne}>{choosenActionOne}</option>
                {(type === "Service" || playerInfo.position !== "MBlocker") && (
                  <option value={choosenActionTwo}>{choosenActionTwo}</option>
                )}
              </select>
            </div>
            <div className="count-button-wrapper">
              <button type="submit" className="countButton" disabled={!showInputs || disableSwitch}>
                Count
              </button>
            </div>
            <div className="zones-wrapper">
              {type === "Service"
                ? zonesStates.map((ball, index) =>
                    !ball.active ? (
                      <BallForAttack
                        key={index}
                        value={ball.zone.replace(/[a-z]/g, "")}
                        className={!showBalls ? ball.zone : "none"}
                        index={index}
                        zonesStates={zonesStates}
                        setZonesStates={setZonesStates}
                        setShowInputs={setShowInputs}
                        setShowBalls={setShowBalls}
                      />
                    ) : (
                      <BallForAttack
                        key={index}
                        value="🏐"
                        className={ball.zone + " showTheBall"}
                        index={index}
                        zonesStates={zonesStates}
                        setZonesStates={setZonesStates}
                        setShowInputs={setShowInputs}
                        setShowBalls={setShowBalls}
                      />
                    )
                  )
                : playerInfo.position === "Opposite"
                ? zonesStates
                    .slice(0, 3)
                    .map((ball, index) =>
                      ball.active === false ? (
                        <BallForAttack
                          key={index}
                          value={ball.zone.replace(/[a-z]/g, "")}
                          className={!showBalls ? ball.zone : "none"}
                          index={index}
                          zonesStates={zonesStates}
                          setZonesStates={setZonesStates}
                          setShowInputs={setShowInputs}
                          setShowBalls={setShowBalls}
                        />
                      ) : (
                        <BallForAttack
                          key={index}
                          value="🏐"
                          className={ball.zone + " showTheBall"}
                          index={index}
                          zonesStates={zonesStates}
                          setZonesStates={setZonesStates}
                          setShowInputs={setShowInputs}
                          setShowBalls={setShowBalls}
                        />
                      )
                    )
                : playerInfo.position === "Reciever"
                ? zonesStates
                    .slice(1, 4)
                    .map((ball, index) =>
                      ball.active === false ? (
                        <BallForAttack
                          key={index + 1}
                          value={ball.zone.replace(/[a-z]/g, "")}
                          className={!showBalls ? ball.zone : "none"}
                          index={index + 1}
                          zonesStates={zonesStates}
                          setZonesStates={setZonesStates}
                          setShowInputs={setShowInputs}
                          setShowBalls={setShowBalls}
                        />
                      ) : (
                        <BallForAttack
                          key={index + 1}
                          value="🏐"
                          className={ball.zone + " showTheBall"}
                          index={index + 1}
                          zonesStates={zonesStates}
                          setZonesStates={setZonesStates}
                          setShowInputs={setShowInputs}
                          setShowBalls={setShowBalls}
                        />
                      )
                    )
                : playerInfo.position === "MBlocker"
                ? zonesStates
                    .slice(4, 7)
                    .map((ball, index) =>
                      ball.active === false ? (
                        <BallForAttack
                          key={index + 4}
                          value={ball.zone.replace(/[a-z]/g, "")}
                          className={!showBalls ? ball.zone : "none"}
                          index={index + 4}
                          zonesStates={zonesStates}
                          setZonesStates={setZonesStates}
                          setShowInputs={setShowInputs}
                          setShowBalls={setShowBalls}
                        />
                      ) : (
                        <BallForAttack
                          key={index + 4}
                          value="🏐"
                          className={ball.zone + " showTheBall"}
                          index={index + 4}
                          zonesStates={zonesStates}
                          setZonesStates={setZonesStates}
                          setShowInputs={setShowInputs}
                          setShowBalls={setShowBalls}
                        />
                      )
                    )
                : null}
            </div>
          </form>
          {disableSwitch && !showDataOfActions && (
            <div className="cones-wrapper">
              {Object.values(zoneValue).map((value, index) => (
                <ConeReaction key={index} value={value} />
              ))}
            </div>
          )}
          {showBalls && (
            <>
              {!disableSwitch && !showDataOfActions && (
                <div className="cones-wrapper">
                  {Object.entries(zoneValue).map(([key, value]) => (
                    <InputForCount
                      key={key}
                      name={key}
                      setZoneValue={setZoneValue}
                      zoneValue={zoneValue}
                      value={value}
                    />
                  ))}
                </div>
              )}
              {saveDataOfActions && (
                <CheckEquality
                  zoneValue={zoneValue}
                  diagrammValue={diagrammValue}
                  checkEquality={checkEquality}
                />
              )}
            </>
          )}
        </>
      }
    />
  );
}
