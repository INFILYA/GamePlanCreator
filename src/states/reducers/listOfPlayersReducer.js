import { defaultState } from "../defaultStates";
import { fetchPlayers as fetchPlayersApiCall } from "../../Datas/api";

export function fetchPlayers() {
  return function (dispatch) {
    fetchPlayersApiCall().then((json) => dispatch(setAllPlayers(json)));
  };
}

export function setAllPlayers(listOfPlayers) {
  return {
    type: "SET_ALL_PLAYERS",
    payload: listOfPlayers,
  };
}
export function listOfPlayersReducer(
  state = defaultState.listOfPlayers,
  action
) {
  switch (action.type) {
    case "SET_ALL_PLAYERS":
      return action.payload;
    default:
      return state;
  }
}
