import { useState } from "react";
import { BallForAttack } from "./BallForAttack";
import { Explain } from "./Explain";
import { savePlayer, saveTeam } from "../../Datas/api";
import { fetchPlayerInfo } from "../../states/reducers/playerInfoReducer";
import { fetchPlayers } from "../../states/reducers/listOfPlayersReducer";
import { fetchTeams } from "../../states/reducers/listOfTeamsReducer";
import { useDispatch, useSelector } from "react-redux";
import { DefenderZone6 } from "./DefenderZone6";
import { ConeReaction } from "./ConeReaction";
import { InputForCount } from "./InputForCount";

export function ServiceFields() {
  const dispatch = useDispatch();
  const playerInfo = useSelector((state) => state.playerInfo);
  const allPlayers = useSelector((state) => state.listOfPlayers);
  const teams = useSelector((state) => state.listOfTeams);
  const [showInputs, setShowInputs] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [saveDataOfServices, setSaveDataOfServices] = useState(false);
  const [disableSwitch, setDisableSwitch] = useState(false);
  const [confirmReturn, setConfirmReturn] = useState(false);
  const [previousPlayerHistory, setPreviousPlayerHistory] = useState(null);
  const [previousTeamHistory, setPreviousTeamHistory] = useState(null);
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
  const classNamesForConesAndInputs = [
    ["Bluez5", "Yellowz5", "Purplez5", "Redz5"],
    ["Bluez6", "Yellowz6", "Purplez6", "Redz6"],
    ["Bluez1", "Yellowz1", "Purplez1", "Redz1"],
  ];
  const classNamesForTip = ["tip", "yellowtip"];
  const arrayForRecievers = [1, 2, 3, 4, 5];

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
        +diagrammValue.aces - +diagrammValue.serviceFailed;
    }
    obj.aces += +diagrammValue.aces;
    obj.servicePlus += +diagrammValue.servicePlus;
    obj.serviceMinus += +diagrammValue.serviceMinus;
    obj.serviceFailed += +diagrammValue.serviceFailed;
    obj.plusMinusOnService += +diagrammValue.plusMinusOnService;
    return obj;
  }
  async function onHandleCountClick(event) {
    event.preventDefault();
    let ServiceByZone = Object.values(zoneValue);
    if (
      saveDataOfServices &&
      diagrammValue.aces +
        diagrammValue.servicePlus +
        diagrammValue.serviceMinus +
        diagrammValue.serviceFailed ===
        ServiceByZone.reduce((a, b) => a + b, 0)
    ) {
      setConfirmReturn(!confirmReturn);
      setPreviousPlayerHistory({ ...playerInfo });
      setPreviousTeamHistory({
        ...teams.find((team) => team.name === playerInfo.teamid),
      });
      calculateForData(playerInfo);
      const zoneOfServ = historyOfBalls.find((ball) => ball.active);
      const servHistory = playerInfo[zoneOfServ.zone];
      const res = ServiceByZone.map((att, index) => att + servHistory[index]);
      const nameOfZone = zoneOfServ.zone;
      const players = allPlayers.filter(
        (player) => player.teamid === playerInfo.teamid
      );
      const team = teams.find((team) => team.name === playerInfo.teamid);
      const teamAge = players.reduce((a, b) => a + b.age, 0) / players.length;
      calculateForData(team);
      team.age = +teamAge.toFixed(1);
      ServiceByZone = res;
      playerInfo[nameOfZone] = ServiceByZone;
      await savePlayer(playerInfo); //сохраняю одного игрока
      await saveTeam(team); // сохраняю команду
      dispatch(fetchPlayerInfo(playerInfo)); // обвновляю инфу игрока
      dispatch(fetchPlayers()); // обновляю  всех игроков
      setDisableSwitch(!disableSwitch);
      setSaveDataOfServices(!saveDataOfServices);
    }
    if (
      saveDataOfServices &&
      diagrammValue.aces +
        diagrammValue.servicePlus +
        diagrammValue.serviceMinus +
        diagrammValue.serviceFailed !==
        ServiceByZone.reduce((a, b) => a + b, 0)
    ) {
      setSaveDataOfServices(!saveDataOfServices);
      setDisableSwitch(!disableSwitch);
      alert(
        "Total Value of field inputs should be equal total value of data inputs! Data not overwritten!"
      );
    }
    const totalServices = ServiceByZone.reduce((a, b) => a + b, 0.0001);
    const result = ServiceByZone.map((obj) =>
      Math.round((obj / totalServices) * 100)
    );
    const upgratedZoneValue = {
      1: result[0] + "%",
      2: result[1] + "%",
      3: result[2] + "%",
    };
    setZoneValue(upgratedZoneValue);
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
    <>
      <form className="serviceField">
        <select className="typeOfService">
          <option defaultValue="Type of service">Type of service</option>
          <option
            defaultValue="Jump"
            onClick={showInputs ? onHandleCountClick : null}
          >
            Jump{" "}
          </option>
          <option
            defaultValue="Float"
            onClick={showInputs ? onHandleCountClick : null}
          >
            Float
          </option>
          <option defaultValue="Hybrid">Hybrid</option>
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
        )}
        {!showInputs &&
          arrayForRecievers.map((reciever) => <DefenderZone6 key={reciever} />)}
      </form>
    </>
  );
}
