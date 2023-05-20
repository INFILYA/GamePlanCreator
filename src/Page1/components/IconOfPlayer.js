import { useDispatch } from "react-redux";
import { setInfoOfPlayer } from "../../states/reducers/playerInfoReducer";

export function IconOfPlayer({ player, zones }) {
  const dispatch = useDispatch();

  function setPlayerInfo(player) {
    dispatch(setInfoOfPlayer(player));
  }
  return (
    <>
      {zones && <img src={player.photo} alt=""></img>}
      <div className="numberPlusInput" onClick={() => setPlayerInfo(player)}>
        <button type="text" disabled className="playerNumber">
          {player.number}
        </button>
        <button type="text" className="input">
          {player.name}
        </button>
      </div>
    </>
  );
}
