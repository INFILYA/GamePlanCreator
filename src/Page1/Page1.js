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
import { FirstPage } from "./components/FirstPage";
import { MainLabel } from "./components/MainLabel";

export default function Page1() {
  const dispatch = useDispatch();
  const listOfTeams = useSelector((state) => state.listOfTeams);
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
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
    const zones = ["P4", "P3", "P2", "P5", "P6", "P1"];
    return zones[index];
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
    const Zone = [...myTeamZones];
    const newRot = [Zone[3], Zone[0], Zone[1], Zone[4], Zone[5], Zone[2]];
    setMyTeamZones(newRot);
  }
  function moveRotationBack() {
    const Zone = [...myTeamZones];
    let newRot = [Zone[1], Zone[2], Zone[5], Zone[0], Zone[3], Zone[4]];
    setMyTeamZones(newRot);
  }
  function removeRivalOption(index) {
    // Видаляю з селекту зону у суперника
    const newIndexOfZones = indexOfZones.filter((zone) => zone !== index);
    setIndexOfZones(newIndexOfZones);
  }
  function removeMyTeamOption(index) {
    // Видаляю з селекту зону у моєї команди
    const newIndexOfZones = sequanceOfZones.filter((zone) => zone !== index);
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
    const newTeam = players.filter((players) => players.id !== player.id);
    setplayers(newTeam);
  }
  function pushFromMyTeamBoard(player) {
    // Прибираю з списку гравців моєї команди після додавання до стартової шістки
    const newTeam = myTeamPlayers.filter((players) => players.id !== player.id);
    setMyTeamPlayers(newTeam);
  }
  function setPlayerToZone(player, index) {
    //Відправляю гравців до стартової шістки суперника
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
          removeRivalOption={removeRivalOption}
          removeMyTeamOption={removeMyTeamOption}
          moveRotationForward={moveRotationForward}
          moveRotationBack={moveRotationBack}
          correctNamesOfZones={correctNamesOfZones}
        />
      </div>
      <div className="showDistribution">
        <NavLink to={"/Distribution"}>Distribution</NavLink>
      </div>
      <Outlet />
    </>
  );
}
