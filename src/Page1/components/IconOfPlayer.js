import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../../states/reducers/playerInfoReducer";
import { setShowPersonalInfo } from "../../states/reducers/showPersonalInfoReducer";

export function IconOfPlayer({ player, zones }) {
  const dispatch = useDispatch();
  const showPersonalInfo = useSelector((state) => state.showPersonalInfo);

  function setPlayerInfo(player) {
    dispatch(setInfoOfPlayer(player));
    showPersonalInfo
      ? dispatch(setShowPersonalInfo(true))
      : dispatch(setShowPersonalInfo(!showPersonalInfo));
  }
  return (
    <>
      {zones && <img src={player.photo} alt=""></img>}
      <div className="numberPlusInput" onFocus={() => setPlayerInfo(player)}>
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
