import { useEffect, useState } from "react";
import { BallForAttack } from "./BallForAttack";
import { Explain } from "./Explain";
import { reduce } from "../../Datas/api";
import { upgradeAge } from "../../StaticHelpModules/Button";
import { useDispatch, useSelector } from "react-redux";
import { DefenderZone6 } from "./DefenderZone6";
import { ConeReaction } from "./ConeReaction";
import { InputForCount } from "./InputForCount";
import { CheckEquality } from "./CheckEquality";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { dataBase } from "../../config/firebase";
import { setUserVersion } from "../../states/slices/userVersionSlice";
import { setAllPlayers } from "../../states/slices/listOfPlayersSlice";
import { setInfoOfPlayer } from "../../states/slices/playerInfoSlice";
import { setAllTeams } from "../../states/slices/listOfTeamsSlice";

export function ServiceFields() {
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
  const [saveDataOfServices, setSaveDataOfServices] = useState(false);
  const [disableSwitch, setDisableSwitch] = useState(false);
  const [confirmReturn, setConfirmReturn] = useState(false);
  const [previousPlayerData, setPreviousPlayerData] = useState(null);
  const [previousTeamData, setPreviousTeamData] = useState(null);
  const [attackPercentageArray, setAttackPercentageArray] = useState([]);
  const [tip, setTip] = useState(0);

  const [historyOfBalls, setHistoryOfBalls] = useState([
    { zone: "serviceZone1", active: false },
    { zone: "serviceZone6", active: false },
    { zone: "serviceZone5", active: false },
  ]);
  const [zoneValue, setZoneValue] = useState({
    1: 0,
    2: 0,
    3: 0,
  });
  const [diagrammValue, setDiagrammValue] = useState({
    aces: 0,
    servicePlus: 0,
    serviceMinus: 0,
    serviceFailed: 0,
    plusMinusOnService: 0,
  });

  useEffect(() => {
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo"));
    dispatch(setInfoOfPlayer(playerInfo));
  }, [dispatch]);

  const classNamesForConesAndInputs = [
    ["Bluez5", "Yellowz5", "Purplez5", "Redz5"],
    ["Bluez6", "Yellowz6", "Purplez6", "Redz6"],
    ["Bluez1", "Yellowz1", "Purplez1", "Redz1"],
  ];
  const classNamesForTip = ["tip", "yellowtip"];
  const arrayForRecievers = [1, 2, 3, 4, 5];

  let ServiceByZone = Object.values(zoneValue);
  const keepCountDisabled = ServiceByZone.every((zone) => typeof zone === "string");
  const checkEquality =
    diagrammValue.servicePlus +
      diagrammValue.serviceMinus +
      diagrammValue.serviceFailed +
      diagrammValue.aces ===
    reduce(ServiceByZone);
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
      diagrammValue.plusMinusOnService =
        diagrammValue.aces * 2 +
        diagrammValue.servicePlus * 0.5 -
        diagrammValue.serviceFailed -
        diagrammValue.serviceMinus * 0.5;
    }
    obj.aces += diagrammValue.aces;
    obj.servicePlus += diagrammValue.servicePlus;
    obj.serviceMinus += diagrammValue.serviceMinus;
    obj.serviceFailed += diagrammValue.serviceFailed;
    obj.plusMinusOnService += diagrammValue.plusMinusOnService;
    return obj;
  }
  function onHandleCountClick(event) {
    if (event.keyCode === 13) return false;
    event.preventDefault();
    while (saveDataOfServices && !checkEquality) {
      alert("DATA Value not equal to ZONE value");
      return;
    }
    if (saveDataOfServices) {
      setConfirmReturn(!confirmReturn);
      setPreviousPlayerData({ ...playerInfo });
      setPreviousTeamData({
        ...allTeams.find((team) => team.name === playerInfo.teamid),
      });
      calculateForData(playerInfo);
      const zoneOfServ = historyOfBalls.find((ball) => ball.active);
      const servHistory = playerInfo[zoneOfServ.zone];
      const res = ServiceByZone.map((att, index) => att + servHistory[index]);
      const nameOfZone = zoneOfServ.zone;
      const players = allPlayers.filter((player) => player.teamid === playerInfo.teamid);
      const team = allTeams.find((team) => team.name === playerInfo.teamid);
      const upgradedPlayers = players.map((player) => upgradeAge(player));
      const teamAge = upgradedPlayers.reduce((a, b) => a + b.age, 0) / players.length;
      const teamHeight = upgradedPlayers.reduce((a, b) => a + b.height, 0) / players.length;
      const newTeam = { ...team };
      calculateForData(newTeam);
      newTeam.height = +teamHeight.toFixed(1);
      newTeam.age = +teamAge.toFixed(1);
      ServiceByZone = res;
      playerInfo[nameOfZone] = ServiceByZone;
      refreshVersionOFAdmin(1);
      savePlayer(playerInfo); //сохраняю одного игрока
      saveTeam(newTeam); // сохраняю команду
      setSaveDataOfServices(!saveDataOfServices);
    }
    const totalServices = reduce(ServiceByZone, 0.0001);
    const result = ServiceByZone.map((obj) => Math.round((obj / totalServices) * 100));
    const upgradedZoneValue = Object.fromEntries(
      Object.entries(result).map(([key, value]) => [+key + 1, value + "%"])
    );
    setZoneValue(upgradedZoneValue);
    setAttackPercentageArray(result);
    setShowInputs(!showInputs);
    setDisableSwitch(!disableSwitch);
  }
  function returnOldData() {
    refreshVersionOFAdmin(-1);
    savePlayer(previousPlayerData);
    saveTeam(previousTeamData);
    setConfirmReturn(!confirmReturn);
    alert("Last Data Returned");
  }

  const refreshVersionOFAdmin = async (count) => {
    try {
      const docVersionRef = doc(dataBase, "versionChecker", "currentVersion");
      await setDoc(docVersionRef, { currentVersion: userVersion + count });
      const adminVersion = userVersion + count;
      dispatch(setUserVersion(adminVersion));
    } catch (error) {
      console.error(error);
    }
  };

  const savePlayer = async (player) => {
    try {
      await setDoc(doc(dataBase, "players", player.id), player);
      const data = await getDocs(playersCollectionRefs);
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setAllPlayers(list));
      const playerInfo = list.find((players) => players.id === player.id);
      localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
      dispatch(setInfoOfPlayer(playerInfo));
    } catch (error) {
      console.error(error);
    }
  };
  const saveTeam = async (team) => {
    try {
      await setDoc(doc(dataBase, "clubs", team.id), team);
      const data = await getDocs(clubsCollectionRefs);
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setAllTeams(list));
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <>
      <form className="playArea" onSubmit={(event) => event.preventDefault()}>
        <select
          className="typeOfService"
          onChange={!showDataOfAttacks ? onHandleCountClick : showData}
          disabled={!showInputs || keepCountDisabled}
        >
          <option defaultValue="Type of service">Type of service</option>
          <option>Jump</option>
          <option>Float</option>
          <option>Hybrid</option>
        </select>
        <div>
          {historyOfBalls.map((ball, index) =>
            !ball.active ? (
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
          )}
          <div>
            <input
              type="button"
              className={classNamesForTip[tip]}
              value="Short"
              onClick={() => setTip((tip + 1) % 2)}
            ></input>
          </div>
        </div>
        <div className="explain">
          <Explain
            confirmReturn={confirmReturn}
            disableSwitch={disableSwitch}
            saveDataOfAttacks={saveDataOfServices}
            setSaveDataOfAttacks={setSaveDataOfServices}
            diagrammValue={diagrammValue}
            handleDiagrammValue={handleDiagrammValue}
            returnOldData={returnOldData}
            showDataOfAttacks={showDataOfAttacks}
            setShowDataOfAttacks={setShowDataOfAttacks}
            type={"Service"}
          />
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
        {showBalls && (
          <>
            {!showDataOfAttacks && (
              <>
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
                <div>
                  {arrayForRecievers.map((reciever) => (
                    <DefenderZone6 key={reciever} />
                  ))}
                </div>
              </>
            )}
            {saveDataOfServices && (
              <CheckEquality
                zoneValue={zoneValue}
                diagrammValue={diagrammValue}
                checkEquality={checkEquality}
              />
            )}
          </>
        )}
      </form>
    </>
  );
}
