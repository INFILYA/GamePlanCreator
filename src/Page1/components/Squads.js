import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../../states/reducers/playerInfoReducer";
import { pushFromMyBoard } from "../../states/reducers/myTeamPlayersReducer";
import { pushFromRivalBoard } from "../../states/reducers/rivalPlayersReducer";
import { setMyTeamZones } from "../../states/reducers/myTeamZonesReducer";
import { setRivalZones } from "../../states/reducers/zonesReducer";
import { setIndexOfZones } from "../../states/reducers/indexOfZonesReducer";
import { setSequanceOfZones } from "../../states/reducers/sequanceOfZonesReducer";

export function Squads({ team }) {
  const dispatch = useDispatch();
  const rivalClub = useSelector((state) => state.rivalClub);
  const myClub = useSelector((state) => state.myClub);
  const rivalPlayers = useSelector((state) => state.rivalPlayers);
  const myTeamPlayers = useSelector((state) => state.myTeamPlayers);
  const indexOfZones = useSelector((state) => state.indexOfZones);
  const sequanceOfZones = useSelector((state) => state.sequanceOfZones);

  const club = team === "my" ? myClub : rivalClub;
  const players = team === "my" ? myTeamPlayers : rivalPlayers;
  const zoness = team === "my" ? sequanceOfZones : indexOfZones;

  function pushFromMyTeamBoard(player) {
    dispatch(pushFromMyBoard(player));
  }
  function pushFromBoard(player) {
    dispatch(pushFromRivalBoard(player));
  }
  function setPlayerToMyTeamZone(player, index) {
    dispatch(setMyTeamZones(player, index));
    pushFromMyTeamBoard(player);
  }
  function setRivalPlayerToZone(player, zone) {
    dispatch(setRivalZones(player, zone));
    pushFromBoard(player);
  }
  function removeRivalSelectOption(zone) {
    dispatch(setIndexOfZones(zone));
  }
  function removeMyTeamSelectOption(index) {
    dispatch(setSequanceOfZones(index));
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
      <div className="teamsquad">
        {club.map((club) => (
          <div
            className="teamLogo"
            key={club.id}
            style={team === "my" ? { direction: "rtl" } : {}}
          >
            <input className="teamlabel" readOnly value={club.name} />
            <img className="photoLogo" src={club.logo} alt="" />
          </div>
        ))}
        {players.map((player) => (
          <div
            key={player.id}
            className="playerSurname"
            style={team === "my" ? { direction: "rtl" } : {}}
          >
            <div
              className="numberPlusInput"
              onFocus={() => setPlayerInfo(player)}
            >
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
            {zoness && (
              <select className="moveToBoard" type="text">
                {team === "my" ? (
                  <option defaultValue="◀">◀</option>
                ) : (
                  <option defaultValue="▶">▶</option>
                )}
                {zoness.map((zone, index) => (
                  <option
                    key={index}
                    value={`index[${[zone]}]`}
                    onClick={
                      team === "my"
                        ? () =>
                            setPlayerToMyTeamZone(player, zone) ||
                            removeMyTeamSelectOption(zone)
                        : () =>
                            setRivalPlayerToZone(player, zone) ||
                            removeRivalSelectOption(zone)
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
