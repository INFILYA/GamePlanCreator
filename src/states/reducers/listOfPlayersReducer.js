import { defaultState } from "../defaultStates";

export function fetchPlayers() {
  return function (dispatch) {
    fetch("http://localhost:3000/players")
      .then((res) => res.json())
      .then((json) => dispatch(setAllPlayers(json)));
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
