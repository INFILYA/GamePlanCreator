import { useDispatch, useSelector } from "react-redux";
import { PersonalInformationOfPlayer } from "../../PersonalInfo/PersonalInformationOfPlayer";
import { ChooseOpponentTeam } from "./ChooseOpponentTeam";
import { IconOfPlayer } from "./IconOfPlayer";
import { Squads } from "./Squads";
import {
  rotateBackMyTeam,
  rotateForwardMyTeam,
} from "../../states/reducers/myTeamZonesReducer";
import { setMyTeamPlayers } from "../../states/reducers/myTeamPlayersReducer";
import { setMyTeam } from "../../states/reducers/myClubReducer";
import { MainLabel } from "./MainLabel";
import { setInfoOfPlayer } from "../../states/reducers/playerInfoReducer";

export function FirstPage() {
  const dispatch = useDispatch();
  const listOfTeams = useSelector((state) => state.listOfTeams);
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
  const playerInfo = useSelector((state) => state.playerInfo);
  const rivalPlayers = useSelector((state) => state.rivalPlayers);
  const myTeamPlayers = useSelector((state) => state.myTeamPlayers);
  const zones = useSelector((state) => state.zones);
  const myTeamZones = useSelector((state) => state.myTeamZones);

  function handleSetMyTeam(club) {
    dispatch(setMyTeamPlayers(listOfPlayers, club));
    dispatch(setMyTeam(listOfTeams, club));
  }
  //
  function moveRotationForward() {
    dispatch(rotateForwardMyTeam());
  }
  function moveRotationBack() {
    dispatch(rotateBackMyTeam());
  }
  function setPlayerInfo(player) {
    dispatch(setInfoOfPlayer(player));
  }
  function correctNamesOfZones(index) {
    const zones = ["P4", "P3", "P2", "P5", "P6", "P1"];
    return zones[index];
  }
  return (
    <>
      <MainLabel />
      <div style={{ display: "flex" }}>
        <Squads team={"rival"} />
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
            players={rivalPlayers}
            myTeamPlayers={myTeamPlayers}
          />
          <div style={{ marginBottom: 8 }}>
            {zones.slice(0, 3).map((player, index) =>
              player ? (
                <div className="container" key={player.id}>
                  <IconOfPlayer player={player} zones={zones} />
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
                  <IconOfPlayer player={player} />
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
                  <IconOfPlayer player={player} zones={zones} />
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
                  <IconOfPlayer player={player} />
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
          <Squads team={"my"} />
        ) : (
          <div className="teamsquad">
            <select className="chooseHomeTeam">
              <option value="Choose home team">Choose home team</option>
              {listOfTeams.map((team) => (
                <option key={team.id} onClick={() => handleSetMyTeam(team)}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
}
