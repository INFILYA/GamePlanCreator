import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../../states/slices/playerInfoSlice";
import { pushFromRivalBoard } from "../../states/slices/rivalPlayersSlice";
import { resetRivalZones } from "../../states/slices/zonesSlice";
import { resetIndexOfZones } from "../../states/slices/indexOfZonesSlice";
import { pushFromMyBoard } from "../../states/slices/myTeamPlayersSlice";
import { resetMyTeamZones } from "../../states/slices/myTeamZonesSlice";
import { resetSequanceOfZones } from "../../states/slices/sequanceOfZonesSlice";

export function IconOfPlayer({ player, zones, type }) {
  const dispatch = useDispatch();
  const listOfPlayers = useSelector((state) => state.listOfPlayers.listOfPlayers);
  function setPlayerInfo(info) {
    const playerInfo = listOfPlayers.find((players) => players.id === info.id);
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
