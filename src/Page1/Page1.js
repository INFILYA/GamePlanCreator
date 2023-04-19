import "../cssData/firstPage.css";
import "../cssData/labels.css";
import "../cssData/distribution.css";
import "../cssData/newAttack.css";
import "../cssData/service.css";
import "../cssData/diagramm.css";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { fetchPlayers } from "../states/listOfPlayersReducer";
import { fetchTeams } from "../states/listOfTeamsReducer";
import { useDispatch, useSelector } from "react-redux";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";

function SetDate() {
  let date = new Date();
  let options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const Data = date.toLocaleDateString("en-US", options);
  return <button className="date">{Data}</button>;
}
function MainLabel({ clubs, myClub }) {
  return (
    <div>
      <label className="label">
        <SetDate />
        <div id="Matchup">
          {clubs.map((club) => club.name)} vs {myClub.map((team) => team.name)}
        </div>
        <div className="setGame">
          Game №<input type="text" className="GameNumber" />
        </div>
      </label>
    </div>
  );
}

function IconOfPlayer({ obj, setPlayerInfo, zones }) {
  return (
    <>
      {zones && <img src={obj.photo} alt=""></img>}
      <div className="numberPlusInput" onFocus={() => setPlayerInfo(obj)}>
        <button type="text" disabled className="playerNumber">
          {obj.number}
        </button>
        <button type="text" className="input">
          {obj.name}
        </button>
      </div>
    </>
  );
}
function ChooseOpponentTeam({
  teams,
  handleSetOpponentTeam,
  resetTheBoard,
  players,
  myTeamPlayers,
}) {
  return (
    <>
      <div className="opponentTeamList">
        {teams.map((team) => (
          <button
            onClick={() => handleSetOpponentTeam(team.name)}
            className="opponentTeams"
            key={team.id}
          >
            {team.name}
          </button>
        ))}
        {players.length > 2 || myTeamPlayers.length > 2 ? (
          <button onClick={resetTheBoard} className="reset">
            Reset
          </button>
        ) : null}
      </div>
    </>
  );
}
function Squads({
  setPlayerToZone,
  indexOfZones,
  sequanceOfZones,
  removeOption,
  setPlayerInfo,
  clubs,
  players,
  correctNamesOfZones,
  rtl,
  fuchsia,
  darkgray,
}) {
  return (
    <>
      <div className="teamsquad">
        {clubs.map((obj) => (
          <div className="teamLogo" key={obj.id} style={rtl}>
            <input className="teamlabel" readOnly value={obj.name} />
            <img className="photoLogo" src={obj.logo} alt="" />
          </div>
        ))}
        {players.map((player) => (
          <div key={player.id} className="playerSurname" style={rtl}>
            <div
              className="numberPlusInput"
              onFocus={() => setPlayerInfo(player)}
            >
              <button
                type="text"
                disabled
                className="playerNumber"
                style={fuchsia}
              >
                {player.number}
              </button>
              <button type="text" className="input" style={darkgray}>
                {player.name}
              </button>
            </div>
            {indexOfZones && (
              <select className="moveToBoard" type="text">
                {!sequanceOfZones ? (
                  <option defaultValue="▶">▶</option>
                ) : (
                  <option defaultValue="◀">◀</option>
                )}
                {indexOfZones.map((zone, index) => (
                  <option
                    key={index}
                    value={`index[${[zone]}]`}
                    onClick={() =>
                      setPlayerToZone(player, zone) || removeOption(zone)
                    }
                  >
                    {correctNamesOfZones(zone)}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
function FirstPage({
  zones,
  myTeamZones,
  setPlayerToZone,
  setPlayerToMyTeamZone,
  handleSetOpponentTeam,
  handleSetMyTeam,
  indexOfZones,
  removeOption,
  playerInfo,
  setPlayerInfo,
  clubs,
  myClub,
  players,
  myTeamPlayers,
  resetTheBoard,
  listOfTeams,
  listOfPlayers,
  sequanceOfZones,
  removeMyTeamOption,
  moveRotationForward,
  moveRotationBack,
  correctNamesOfZones,
}) {
  return (
    <>
      <Squads
        setPlayerToZone={setPlayerToZone}
        indexOfZones={indexOfZones}
        removeOption={removeOption}
        setPlayerInfo={setPlayerInfo}
        clubs={clubs}
        players={players}
        listOfPlayers={listOfPlayers}
        correctNamesOfZones={correctNamesOfZones}
      />

      <div className="rotation">
        <div style={{ display: "flex", justifyContent: "center" }}>
          {playerInfo && (
            <PersonalInformationOfPlayer
              player={playerInfo}
              onClick={() => setPlayerInfo(null)}
            />
          )}
        </div>
        <ChooseOpponentTeam
          teams={listOfTeams}
          handleSetOpponentTeam={handleSetOpponentTeam}
          resetTheBoard={resetTheBoard}
          players={players}
          myTeamPlayers={myTeamPlayers}
        />
        <div style={{ marginBottom: 8 }}>
          {zones.slice(0, 3).map((player, index) =>
            player ? (
              <div className="container" key={player.id}>
                <IconOfPlayer
                  obj={player}
                  setPlayerInfo={setPlayerInfo}
                  zones={zones}
                />
              </div>
            ) : (
              <div className="container" key={"_" + index}>
                {correctNamesOfZones(index)}
              </div>
            )
          )}
        </div>
        <div>
          {myTeamZones.slice(0, 3).map((player, index) =>
            player ? (
              <div className="smallBox" key={player.id}>
                <IconOfPlayer obj={player} setPlayerInfo={setPlayerInfo} />
              </div>
            ) : (
              <div className="smallBox" key={"x" + index}></div>
            )
          )}
        </div>
        <div style={{ marginBottom: 9 }}>
          {zones.slice(3, 6).map((player, index) =>
            player ? (
              <div className="container" key={player.id}>
                <IconOfPlayer
                  obj={player}
                  setPlayerInfo={setPlayerInfo}
                  zones={zones}
                />
              </div>
            ) : (
              <div className="container" key={"_" + index}>
                {correctNamesOfZones(index + 3)}
              </div>
            )
          )}
        </div>
        <div>
          {myTeamZones.slice(3, 6).map((player, index) =>
            player ? (
              <div className="smallBox" key={player.id}>
                <IconOfPlayer obj={player} setPlayerInfo={setPlayerInfo} />
              </div>
            ) : (
              <div className="smallBox" key={"x" + index}></div>
            )
          )}
        </div>
        <div className="plusMinus" style={{ marginTop: 20 }}>
          <button onClick={moveRotationForward}>🡄</button>
          {myTeamZones.map((player, index) =>
            player && player.position === "Setter" ? (
              <span
                key={player.id}
                style={{ marginLeft: 50, marginRight: 50, fontSize: 35 }}
              >
                {correctNamesOfZones(index)}
              </span>
            ) : null
          )}
          <button onClick={moveRotationBack}>🡆</button>
        </div>
      </div>
      {myTeamPlayers.length > 2 ? (
        <Squads
          setPlayerInfo={setPlayerInfo}
          setPlayerToZone={setPlayerToMyTeamZone}
          removeOption={removeMyTeamOption}
          indexOfZones={sequanceOfZones}
          clubs={myClub}
          players={myTeamPlayers}
          sequanceOfZones={sequanceOfZones}
          correctNamesOfZones={correctNamesOfZones}
          rtl={{ direction: "rtl" }}
          fuchsia={{
            backgroundColor: "fuchsia",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          darkgray={{
            backgroundColor: "darkgray",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />
      ) : (
        <div className="teamsquad">
          <select className="chooseHomeTeam">
            <option value="Choose home team">Choose home team</option>
            {listOfTeams.map((team) => (
              <option key={team.id} onClick={() => handleSetMyTeam(team.name)}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

export default function Page1() {
  const dispatch = useDispatch();
  const listOfTeams = useSelector((state) => state.listOfTeams.listOfTeams);
  const listOfPlayers = useSelector(
    (state) => state.listOfPlayers.listOfPlayers
  );
  const [players, setplayers] = useState([]); // Гравці обраної команди суперника
  const [clubs, setClubs] = useState([]); // Обрана команда суперника
  const [myTeamPlayers, setMyTeamPlayers] = useState([]); // Гравці моєї обраної команди
  const [myClub, setMyClub] = useState([]); // Обрана моя команда
  const [zones, setZones] = useState(Array(6).fill(null)); // Стартова шістка суперника
  const [myTeamZones, setMyTeamZones] = useState(Array(6).fill(null)); // СТартова шістка моя
  const [playerInfo, setPlayerInfo] = useState(null); // Информация про гравця
  const [indexOfZones, setIndexOfZones] = useState([5, 2, 1, 0, 3, 4]); // Select для суперника
  const [sequanceOfZones, setSequanceOfZones] = useState([5, 2, 1, 0, 3, 4]); // Select для моєї команди
  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchTeams());
  }, [dispatch]);
  function correctNamesOfZones(index) {
    //Костиль для правильного відображення зон
    return index === 5
      ? "P1"
      : index === 2
      ? "P2"
      : index === 1
      ? "P3"
      : index === 0
      ? "P4"
      : index === 3
      ? "P5"
      : index === 4
      ? "P6"
      : index;
  }

  function resetTheBoard() {
    //Кнопка збросу
    setplayers([]);
    setMyTeamPlayers([]);
    setClubs([]);
    setMyClub([]);
    setZones(Array(6).fill(null));
    setMyTeamZones(Array(6).fill(null));
    setIndexOfZones([5, 2, 1, 0, 3, 4]);
    setSequanceOfZones([5, 2, 1, 0, 3, 4]);
    setPlayerInfo(null);
  }
  function moveRotationForward() {
    // Провернути вперед розстановку
    const newArr = [...myTeamZones];
    let part432 = newArr.slice(0, 3);
    let part165 = newArr.slice(3, 6);
    let newRot = [
      part165[0],
      part432[0],
      part432[1],
      part165[1],
      part165[2],
      part432[2],
    ];
    setMyTeamZones(newRot);
  }
  function moveRotationBack() {
    // Провернути назад розстановку
    const newArr = [...myTeamZones];
    let part432 = newArr.slice(0, 3);
    let part165 = newArr.slice(3, 6);
    let newRot = [
      part432[1],
      part432[2],
      part165[2],
      part432[0],
      part165[0],
      part165[1],
    ];
    setMyTeamZones(newRot);
  }
  function removeOption(index) {
    // Видаляю з селекту зону у суперника
    const newIndexOfZones = indexOfZones.filter((obj) => obj !== index);
    setIndexOfZones(newIndexOfZones);
  }
  function removeMyTeamOption(index) {
    // Видаляю з селекту зону у моєї команди
    const newIndexOfZones = sequanceOfZones.filter((obj) => obj !== index);
    setSequanceOfZones(newIndexOfZones);
  }
  function handleSetMyTeam(ID) {
    // Обираю команду суперника
    setMyTeamPlayers(listOfPlayers.filter((player) => player.teamid === ID));
    setMyClub(listOfTeams.filter((team) => team.name === ID));
  }
  function handleSetOpponentTeam(ID) {
    // Обираю свою команду
    setplayers(listOfPlayers.filter((player) => player.teamid === ID));
    setClubs(listOfTeams.filter((team) => team.name === ID));
  }
  function pushFromBoard(player) {
    // Прибираю з списку гравців суперника після додавання до стартової шістки
    const newTeam = players.filter((obj) => obj.id !== player.id);
    setplayers(newTeam);
  }
  function pushFromMyTeamBoard(player) {
    // Прибираю з списку гравців моєї команди після додавання до стартової шістки
    const newTeam = myTeamPlayers.filter((obj) => obj.id !== player.id);
    setMyTeamPlayers(newTeam);
  }
  function setPlayerToZone(player, index) {
    //Відправляю гравців до стартової шістки супеника
    const newZones = [...zones];
    newZones[index] = player;
    setZones(newZones);
    pushFromBoard(player);
  }
  function setPlayerToMyTeamZone(player, index) {
    //Відправляю гравців до стартової шістки моєї команди
    const newZones = [...myTeamZones];
    newZones[index] = player;
    setMyTeamZones(newZones);
    pushFromMyTeamBoard(player);
  }
  return (
    <>
      <MainLabel clubs={clubs} myClub={myClub} />
      <div style={{ display: "flex" }}>
        <FirstPage
          listOfTeams={listOfTeams}
          listOfPlayers={listOfPlayers}
          players={players}
          myTeamPlayers={myTeamPlayers}
          clubs={clubs}
          myClub={myClub}
          zones={zones}
          myTeamZones={myTeamZones}
          playerInfo={playerInfo}
          indexOfZones={indexOfZones}
          sequanceOfZones={sequanceOfZones}
          handleSetMyTeam={handleSetMyTeam}
          handleSetOpponentTeam={handleSetOpponentTeam}
          resetTheBoard={resetTheBoard}
          setPlayerToZone={setPlayerToZone}
          setPlayerToMyTeamZone={setPlayerToMyTeamZone}
          setPlayerInfo={setPlayerInfo}
          removeOption={removeOption}
          removeMyTeamOption={removeMyTeamOption}
          moveRotationForward={moveRotationForward}
          moveRotationBack={moveRotationBack}
          correctNamesOfZones={correctNamesOfZones}
        />
      </div>
      <div className="showDistribution">
        <NavLink to={"/distribution"}>Distribution</NavLink>
      </div>
      <Outlet />
    </>
  );
}
