import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../../../states/slices/playerInfoSlice";
import { pushFromRivalBoard } from "../../../states/slices/rivalPlayersSlice";
import { resetRivalZones } from "../../../states/slices/zonesSlice";
import { resetIndexOfZones } from "../../../states/slices/indexOfZonesSlice";
import { pushFromMyBoard } from "../../../states/slices/myTeamPlayersSlice";
import { resetMyTeamZones } from "../../../states/slices/myTeamZonesSlice";
import { resetSequanceOfZones } from "../../../states/slices/sequanceOfZonesSlice";

export function IconOfPlayer({ player, zones, type }) {
  const dispatch = useDispatch();
  const listOfPlayers = useSelector((state) => state.listOfPlayers.listOfPlayers);
  function setPlayerInfo(player) {
    const playerInfo = listOfPlayers.find((players) => players.name === player.name);
    dispatch(setInfoOfPlayer(playerInfo));
  }
  function cancelRivalChoice(player) {
    dispatch(pushFromRivalBoard(player));
    dispatch(resetRivalZones(player));
    dispatch(resetIndexOfZones({ zones, player }));
  }
  function cancelMyChoice(player) {
    dispatch(pushFromMyBoard(player));
    dispatch(resetMyTeamZones(player));
    dispatch(resetSequanceOfZones({ zones, player }));
  }
  const my = type === "my";
  return (
    <div className="card-content">
      {!my && (
        <div className="player-image-wrapper">
          <img src={player?.photo} alt=""></img>
        </div>
      )}
      <div className="player-field-wrapper">
        <div className="playerNumber-wrapper">
          <button
            type="text"
            style={my ? { backgroundColor: "#f0f" } : {}}
            onClick={!my ? () => cancelRivalChoice(player) : () => cancelMyChoice(player)}
          >
            {player.number > 9 ? player.number : `0${player.number}`}
          </button>
        </div>
        <div className="player-surname-wrapper">
          <button
            type="text"
            className="player-surname"
            style={my ? { backgroundColor: "#a9a9a9" } : {}}
            onClick={() => setPlayerInfo(player)}
          >
            {player.name}
          </button>
        </div>
      </div>
    </div>
  );
}
