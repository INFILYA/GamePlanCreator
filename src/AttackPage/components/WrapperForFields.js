import { useState } from "react";
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

export default function WrapperForFields({
  zoneValue,
  diagrammValue,
  setDiagrammValue,
  setZoneValue,
  playerInfo,
  calculateForData,
  zonesStates,
  setZonesStates,
  classNamesForConesAndInputs,
  choosenActionOne,
  choosenActionTwo,
  type,
}) {
  const dispatch = useDispatch();
  const playersCollectionRefs = collection(dataBase, "players");
  const clubsCollectionRefs = collection(dataBase, "clubs");
  const userVersion = useSelector((state) => state.userVersion.userVersion);
  const allPlayers = useSelector((state) => state.listOfPlayers.listOfPlayers);
  const allTeams = useSelector((state) => state.listOfTeams.listOfTeams);
  const [showDataOfActions, setShowDataOfActions] = useState(false);
  const [saveDataOfActions, setSaveDataOfActions] = useState(false);
  const [previousPlayerData, setPreviousPlayerData] = useState(null);
  const [previousTeamData, setPreviousTeamData] = useState(null);
  const [showInputs, setShowInputs] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [disableSwitch, setDisableSwitch] = useState(false);
  const [confirmReturn, setConfirmReturn] = useState(false);
  const [actionType, setActionType] = useState("choose");
  const arrayForRecievers = [1, 2, 3, 4, 5];
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
  const handleZoneValue = (event) => {
    setZoneValue({
      ...zoneValue,
      [event.target.name]: +event.target.value.replace(/\D+/g, ""),
    });
  };

  const onHandleCountClick = (event) => {
    event.preventDefault();
    while (actionType === "choose") {
      alert("Type of Action was not selected");
      return;
    }
    if (saveDataOfActions) {
      while (!checkEquality) {
        alert("DATA Value not equal to ZONE value");
        return;
      }
      setConfirmReturn(!confirmReturn);
      setPreviousPlayerData({ ...playerInfo });
      setPreviousTeamData({
        ...allTeams.find((team) => team.name === playerInfo.teamid),
      });
      calculateForData(playerInfo);
      const zoneOfAction = zonesStates.find((ball) => ball.active);
      const actionHistory = playerInfo[zoneOfAction.zone + actionType];
      const result = loadByZone.map((att, index) => att + actionHistory[index]);
      const nameOfZone = zoneOfAction.zone + actionType;
      const players = allPlayers.filter((player) => player.teamid === playerInfo.teamid);
      const team = allTeams.find((team) => team.name === playerInfo.teamid);
      const upgradedPlayers = players.map((player) => upgradeAge(player));
      const teamAge = upgradedPlayers.reduce((a, b) => a + b.age, 0) / players.length;
      const teamHeight = upgradedPlayers.reduce((a, b) => a + b.height, 0) / players.length;
      const newTeam = { ...team };
      calculateForData(newTeam);
      newTeam.age = +teamAge.toFixed(1);
      newTeam.height = +teamHeight.toFixed(1);
      loadByZone = result;
      playerInfo[nameOfZone] = loadByZone;
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
      className="playArea-section"
      backGround={
        <div className="playground-area-background">
          <div className="threeMRivalCort"></div>
          <div className="threeMMyCort"></div>
        </div>
      }
      content={
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
                      attack={!showBalls ? ball.zone : "none"}
                      index={index}
                      zonesStates={zonesStates}
                      setZonesStates={setZonesStates}
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
                      zonesStates={zonesStates}
                      setZonesStates={setZonesStates}
                      setShowInputs={setShowInputs}
                      setShowBalls={setShowBalls}
                      showInputs={showInputs}
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
                        attack={!showBalls ? ball.zone : "none"}
                        index={index}
                        zonesStates={zonesStates}
                        setZonesStates={setZonesStates}
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
                        zonesStates={zonesStates}
                        setZonesStates={setZonesStates}
                        setShowInputs={setShowInputs}
                        setShowBalls={setShowBalls}
                        showInputs={showInputs}
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
                        attack={!showBalls ? ball.zone : "none"}
                        index={index + 1}
                        zonesStates={zonesStates}
                        setZonesStates={setZonesStates}
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
                        zonesStates={zonesStates}
                        setZonesStates={setZonesStates}
                        setShowInputs={setShowInputs}
                        setShowBalls={setShowBalls}
                        showInputs={showInputs}
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
                        attack={!showBalls ? ball.zone : "none"}
                        index={index + 4}
                        zonesStates={zonesStates}
                        setZonesStates={setZonesStates}
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
                        zonesStates={zonesStates}
                        setZonesStates={setZonesStates}
                        setShowInputs={setShowInputs}
                        setShowBalls={setShowBalls}
                        showInputs={showInputs}
                      />
                    )
                  )
              : null}
          </div>
          {disableSwitch && !showDataOfActions && (
            <div className="cones-wrapper">
              {classNamesForConesAndInputs.map((el, index) => (
                <ConeReaction
                  key={index}
                  zoneValue={zoneValue[index]}
                  cone={el}
                  zonesStates={zonesStates}
                  type={type}
                />
              ))}
            </div>
          )}
          {showBalls && (
            <>
              <div className="tip-wrapper">
                <Tip value="Tip" />
                <Tip value="Tip" />
                <Tip value="Tip" />
              </div>
              <div className="defender-wrapper">
                {arrayForRecievers.map((reciever) => (
                  <DefenderZone6 key={reciever} />
                ))}
              </div>
              {!disableSwitch && !showDataOfActions && (
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
              {saveDataOfActions && (
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
