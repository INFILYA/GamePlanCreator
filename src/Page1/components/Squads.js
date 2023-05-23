import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../../states/reducers/playerInfoReducer";
import { pushFromMyBoard } from "../../states/reducers/myTeamPlayersReducer";
import { pushFromRivalBoard, setBenchPlayers } from "../../states/reducers/rivalPlayersReducer";
import { setMyTeamZones } from "../../states/reducers/myTeamZonesReducer";
import { setRivalStartingSix, setRivalZones } from "../../states/reducers/zonesReducer";
import {
  setBackRightRivalSelects,
  setIndexOfZones,
} from "../../states/reducers/indexOfZonesReducer";
import { setSequanceOfZones } from "../../states/reducers/sequanceOfZonesReducer";
import { Button } from "../../StaticHelpModules/Button";
import { correctNamesOfZones } from "../../Datas/api";
import { auth } from "../../config/firebase";

export function Squads({ team }) {
  const dispatch = useDispatch();
  const rivalClub = useSelector((state) => state.rivalClub);
  const myClub = useSelector((state) => state.myClub);
  const rivalPlayers = useSelector((state) => state.rivalPlayers);
  const myTeamPlayers = useSelector((state) => state.myTeamPlayers);
  const indexOfZones = useSelector((state) => state.indexOfZones);
  const sequanceOfZones = useSelector((state) => state.sequanceOfZones);
  const registratedUser = auth?.currentUser?.uid !== undefined;

  const club = team === "my" ? myClub : rivalClub;
  const players = team === "my" ? myTeamPlayers : rivalPlayers;
  const Zones = team === "my" ? sequanceOfZones : indexOfZones;

  function myTeamActions(event) {
    setPlayerToMyTeamZone(event);
    removeMyTeamSelectOption(event);
  }
  function setPlayerToMyTeamZone(event) {
    const player = players.find((player) => player.id === event.target.value.split(",")[0]);
    const zone = +event.target.value.split(",")[1];
    dispatch(setMyTeamZones(player, zone));
    pushFromMyTeamBoard(player);
  }
  function removeMyTeamSelectOption(event) {
    const zone = +event.target.value.split(",")[1];
    dispatch(setSequanceOfZones(zone));
  }
  function pushFromMyTeamBoard(player) {
    dispatch(pushFromMyBoard(player));
  }

  function rivalTeamActions(event) {
    setRivalPlayerToZone(event);
    removeRivalSelectOption(event);
  }
  function setRivalPlayerToZone(event) {
    const player = players.find((player) => player.id === event.target.value.split(",")[0]);
    const zone = +event.target.value.split(",")[1];
    dispatch(setRivalZones(player, zone));
    pushFromBoard(player);
  }
  function removeRivalSelectOption(event) {
    const zone = +event.target.value.split(",")[1];
    dispatch(setIndexOfZones(zone));
  }
  function pushFromBoard(player) {
    dispatch(pushFromRivalBoard(player));
  }

  function setPlayerInfo(player) {
    dispatch(setInfoOfPlayer(player));
  }
  function showStartingSix() {
    dispatch(setRivalStartingSix(rivalPlayers, rivalClub.startingSquad));
    dispatch(setBenchPlayers(rivalPlayers, rivalClub.startingSquad));
    dispatch(setBackRightRivalSelects([]));
  }

  return (
    <>
      <div className="teamsquad">
        <div className="teamLogo" key={club.id} style={team === "my" ? { direction: "rtl" } : null}>
          <input className="teamlabel" readOnly value={club.name} />
          <img className="photoLogo" src={club.logo} alt="" />
        </div>
        {players.map((player) => (
          <div
            key={player.id}
            className="playerSurname"
            style={team === "my" ? { direction: "rtl" } : {}}
          >
            <div className="numberPlusInput" onClick={() => setPlayerInfo(player)}>
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
                {player.number}
              </button>
              <button
                type="text"
                className="input"
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
                {Zones.map((zone, index) => (
                  <option key={index} value={[player.id, zone]}>
                    {correctNamesOfZones(zone)}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        {team !== "my" && rivalPlayers.length > 11 && registratedUser && (
          <Button onClick={showStartingSix} value={"Show Starting six"} />
        )}
      </div>
    </>
  );
}
