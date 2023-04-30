import "../cssData/firstPage.css";
import "../cssData/labels.css";
import "../cssData/distribution.css";
import "../cssData/newAttack.css";
import "../cssData/service.css";
import "../cssData/diagramm.css";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { fetchPlayers } from "../states/reducers/listOfPlayersReducer";
import { fetchTeams } from "../states/reducers/listOfTeamsReducer";
import { useDispatch, useSelector } from "react-redux";
import { FirstPage } from "./components/FirstPage";
import { MainLabel } from "./components/MainLabel";
import {
  pushFromRivalBoard,
  setRivalPlayers,
} from "../states/reducers/rivalPlayersReducer";
import { setRivalTeam } from "../states/reducers/rivalClubReducer";
import { setMyTeam } from "../states/reducers/myClubReducer";
import {
  pushFromMyBoard,
  setMyTeamPlayers,
} from "../states/reducers/myTeamPlayersReducer";
import {
  clearRivalZones,
  setRivalZones,
} from "../states/reducers/zonesReducer";
import { setIndexOfZones } from "../states/reducers/indexOfZonesReducer";

export default function Page1() {
  const dispatch = useDispatch();
  const listOfTeams = useSelector((state) => state.listOfTeams);
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
  const rivalPlayers = useSelector((state) => state.rivalPlayers);
  const rivalClub = useSelector((state) => state.rivalClub);
  const myTeamPlayers = useSelector((state) => state.myTeamPlayers);
  const myClub = useSelector((state) => state.myClub);
  const zones = useSelector((state) => state.zones);
  const indexOfZones = useSelector((state) => state.indexOfZones);
  // const [indexOfZones, setIndexOfZones] = useState([5, 2, 1, 0, 3, 4]); // Select для суперника

  const [myTeamZones, setMyTeamZones] = useState(Array(6).fill(null)); // СТартова шістка моя
  const [playerInfo, setPlayerInfo] = useState(null); // Информация про гравця
  const [sequanceOfZones, setSequanceOfZones] = useState([5, 2, 1, 0, 3, 4]); // Select для моєї команди
  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchTeams());
  }, [dispatch]);
  function resetTheBoard() {
    dispatch(setRivalPlayers([]));
    dispatch(setRivalTeam([]));
    dispatch(setMyTeamPlayers([]));
    dispatch(setMyTeam([]));
    dispatch(clearRivalZones(Array(6).fill(null)));

    setMyTeamZones(Array(6).fill(null));
    // setIndexOfZones([5, 2, 1, 0, 3, 4]);
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
  function handleSetOpponentTeam(club) {
    dispatch(setRivalPlayers(listOfPlayers, club));
    dispatch(setRivalTeam(listOfTeams, club));
  }
  function handleSetMyTeam(club) {
    dispatch(setMyTeamPlayers(listOfPlayers, club));
    dispatch(setMyTeam(listOfTeams, club));
  }
  function pushFromBoard(player) {
    dispatch(pushFromRivalBoard(player));
  }
  function pushFromMyTeamBoard(player) {
    dispatch(pushFromMyBoard(player));
  }
  function setRivalPlayerToZone(player, zone) {
    dispatch(setRivalZones(player, zone));
    pushFromBoard(player);
  }
  function removeRivalSelectOption(zone) {
    dispatch(setIndexOfZones(zone));
  }

  //HERE
  function removeMyTeamOption(index) {
    // Видаляю з селекту зону у моєї команди
    const newIndexOfZones = sequanceOfZones.filter((zone) => zone !== index);
    setSequanceOfZones(newIndexOfZones);
  }
  function setPlayerToMyTeamZone(player, index) {
    //Відправляю гравців до стартової шістки моєї команди
    const newZones = [...myTeamZones];
    newZones[index] = player;
    setMyTeamZones(newZones);
    pushFromMyTeamBoard(player);
  }
  function correctNamesOfZones(index) {
    const zones = ["P4", "P3", "P2", "P5", "P6", "P1"];
    return zones[index];
  }
  return (
    <>
      <MainLabel clubs={rivalClub} myClub={myClub} />
      <div style={{ display: "flex" }}>
        <FirstPage
          listOfTeams={listOfTeams}
          listOfPlayers={listOfPlayers}
          players={rivalPlayers}
          clubs={rivalClub}
          myTeamPlayers={myTeamPlayers}
          myClub={myClub}
          zones={zones}
          myTeamZones={myTeamZones}
          playerInfo={playerInfo}
          indexOfZones={indexOfZones}
          sequanceOfZones={sequanceOfZones}
          handleSetMyTeam={handleSetMyTeam}
          handleSetOpponentTeam={handleSetOpponentTeam}
          resetTheBoard={resetTheBoard}
          setRivalPlayerToZone={setRivalPlayerToZone}
          setPlayerToMyTeamZone={setPlayerToMyTeamZone}
          setPlayerInfo={setPlayerInfo}
          removeRivalSelectOption={removeRivalSelectOption}
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
