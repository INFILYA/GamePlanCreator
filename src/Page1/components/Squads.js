import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../StaticHelpModules/Button";
import { compare, correctNamesOfZones } from "../../Datas/api";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { setMyTeamZones } from "../../states/slices/myTeamZonesSlice";
import { setSequanceOfZones } from "../../states/slices/sequanceOfZonesSlice";
import { pushToMyBoard } from "../../states/slices/myTeamPlayersSlice";
import { setRivalStartingSix, setRivalZones } from "../../states/slices/zonesSlice";
import { setBackRightRivalSelects, setIndexOfZones } from "../../states/slices/indexOfZonesSlice";
import { pushToRivalBoard, setBenchPlayers } from "../../states/slices/rivalPlayersSlice";
import { setInfoOfPlayer } from "../../states/slices/playerInfoSlice";

export function Squads({ team }) {
  const dispatch = useDispatch();
  const rivalClub = useSelector((state) => state.rivalClub.rivalClub);
  const myClub = useSelector((state) => state.myClub.myClub);
  const rivalPlayers = useSelector((state) => state.rivalPlayers.rivalPlayers);
  const myTeamPlayers = useSelector((state) => state.myTeamPlayers.myTeamPlayers);
  const indexOfZones = useSelector((state) => state.indexOfZones.indexOfZones);
  const sequanceOfZones = useSelector((state) => state.sequanceOfZones.sequanceOfZones);
  const zones = useSelector((state) => state.zones.zones);
  const [isRegistratedUser] = useAuthState(auth);

  const club = team === "my" ? myClub : rivalClub;
  const players = team === "my" ? [...myTeamPlayers] : [...rivalPlayers];
  const Zones = team === "my" ? [...sequanceOfZones] : [...indexOfZones];
  const showButtonStartingSix =
    team !== "my" &&
    zones.every((zone) => zone === null) &&
    isRegistratedUser &&
    rivalPlayers.length > 1;

  function myTeamActions(event) {
    setPlayerToMyTeamZone(event);
    removeMyTeamSelectOption(event);
  }
  function setPlayerToMyTeamZone(event) {
    const player = players.find((player) => player.id === event.target.value.split(",")[0]);
    const zone = +event.target.value.split(",")[1];
    dispatch(setMyTeamZones({ player, zone }));
    pushToMyTeamBoard(player);
  }
  function removeMyTeamSelectOption(event) {
    const zone = +event.target.value.split(",")[1];
    dispatch(setSequanceOfZones(zone));
  }
  function pushToMyTeamBoard(player) {
    dispatch(pushToMyBoard(player));
  }

  function rivalTeamActions(event) {
    setRivalPlayerToZone(event);
    removeRivalSelectOption(event);
  }
  function setRivalPlayerToZone(event) {
    const player = players.find((player) => player.id === event.target.value.split(",")[0]);
    const zone = +event.target.value.split(",")[1];
    dispatch(setRivalZones({ player, zone }));
    pushFromBoard(player);
  }
  function removeRivalSelectOption(event) {
    const zone = +event.target.value.split(",")[1];
    dispatch(setIndexOfZones(zone));
  }
  function pushFromBoard(player) {
    dispatch(pushToRivalBoard(player));
  }

  function setPlayerInfo(playerInfo) {
    dispatch(setInfoOfPlayer(playerInfo));
    localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
  }
  function showStartingSix() {
    const rivalTeam = rivalClub.startingSquad;
    dispatch(setRivalStartingSix({ rivalPlayers, rivalTeam }));
    dispatch(setBenchPlayers({ rivalPlayers, rivalTeam }));
    dispatch(setBackRightRivalSelects([]));
  }

  return (
    <section className="teamsquad-section">
      <div className="section-border">
        <div className="section-background"></div>
      </div>
      <div className="section-content-wrapper">
        <div className="section-content">
          <div className="team-title-wrapper" style={team === "my" ? { direction: "rtl" } : {}}>
            <div className="team-label-wrapper">
              <input className="team-label" readOnly value={club.name} />
            </div>
            <div className="team-logo-wrapper">
              <img className="team-logo" src={club.logo} alt="" />
            </div>
          </div>
          <div className="squad-wrapper">
            {players
              .sort((a, b) => compare(a.number, b.number))
              .map((player) => (
                <div
                  key={player.name}
                  className="player-field-wrapper"
                  style={team === "my" ? { direction: "rtl" } : {}}
                >
                  <div className="playerNumber-wrapper">
                    <button
                      type="text"
                      disabled
                      className="playerNumber"
                      style={
                        team === "my"
                          ? {
                              backgroundColor: "fuchsia",
                              borderTopRightRadius: 20,
                              borderBottomRightRadius: 20,
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                            }
                          : {}
                      }
                    >
                      {player.number > 9 ? player.number : `0${player.number}`}
                    </button>
                  </div>
                  <div className="player-surname-wrapper">
                    <button
                      type="text"
                      className="player-surname"
                      onClick={() => setPlayerInfo(player)}
                      style={
                        team === "my"
                          ? {
                              backgroundColor: "darkgray",
                              borderTopLeftRadius: 20,
                              borderBottomLeftRadius: 20,
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                            }
                          : {}
                      }
                    >
                      {player.name}
                    </button>
                  </div>
                  <div className="moveToBoard-wrapper">
                    {Zones && (
                      <select
                        className="moveToBoard"
                        type="text"
                        onChange={team === "my" ? myTeamActions : rivalTeamActions}
                      >
                        {team === "my" ? (
                          <option defaultValue="◀">◀</option>
                        ) : (
                          <option defaultValue="▶">▶</option>
                        )}
                        {Zones.sort((a, b) =>
                          compare(correctNamesOfZones(a), correctNamesOfZones(b))
                        ).map((zone, index) => (
                          <option key={index} value={[player.id, zone]}>
                            {correctNamesOfZones(zone)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            {showButtonStartingSix && (
              <Button onClick={showStartingSix} value={"Show Starting six"} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
