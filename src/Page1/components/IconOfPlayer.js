import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../../states/reducers/playerInfoReducer";
import { pushFromRivalBoard } from "../../states/reducers/rivalPlayersReducer";
import { resetRivalZones } from "../../states/reducers/zonesReducer";
import { resetIndexOfZones } from "../../states/reducers/indexOfZonesReducer";
import { pushFromMyBoard } from "../../states/reducers/myTeamPlayersReducer";
import { resetMyTeamZones } from "../../states/reducers/myTeamZonesReducer";
import { resetSequanceOfZones } from "../../states/reducers/sequanceOfZonesReducer";

export function IconOfPlayer({ player, zones, type }) {
  const dispatch = useDispatch();
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
  function setPlayerInfo(player) {
    dispatch(setInfoOfPlayer(listOfPlayers.find((players) => players.id === player.id)));
  }
  function cancelRivalChoice(player) {
    dispatch(pushFromRivalBoard(player));
    dispatch(resetRivalZones(player.name));
    dispatch(resetIndexOfZones(zones, player));
  }
  function cancelMyChoice(player) {
    dispatch(pushFromMyBoard(player));
    dispatch(resetMyTeamZones(player.name));
    dispatch(resetSequanceOfZones(zones, player));
  }
  return (
    <>
      {zones && type === "rival" && <img src={player.photo} alt=""></img>}
      <div className="numberPlusInput">
        <button
          type="text"
          className="playerNumber"
          onClick={
            type === "rival" ? () => cancelRivalChoice(player) : () => cancelMyChoice(player)
          }
        >
          {player.number}
        </button>
        <button type="text" className="input" onClick={() => setPlayerInfo(player)}>
          {player.name}
        </button>
      </div>
    </>
  );
}
