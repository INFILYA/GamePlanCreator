import { fetchPlayerInformation } from "../../Datas/api";
import { defaultState } from "../defaultStates";

export function fetchPlayerInfo(player) {
  return function (dispatch) {
    fetchPlayerInformation(player)
      .then(console.log("fetchPlayerInformation => DONE"))
      .then((json) => dispatch(setInfoOfPlayer(json)));
  };
}

export function setInfoOfPlayer(player) {
  return {
    type: "SET_PLAYER_INFO",
    payload: player,
  };
}

export function playerInfoReducer(state = defaultState.playerInfo, action) {
  switch (action.type) {
    case "SET_PLAYER_INFO":
      localStorage.setItem("playerInfo", JSON.stringify(action.payload));
      const orderedPlayerInfo = { ...action.payload };
      const infosOfPlayers =
        action.payload &&
        Object.fromEntries(Object.entries(orderedPlayerInfo).sort((a, b) => a > b));
      return infosOfPlayers;
    default:
      return state;
  }
}
