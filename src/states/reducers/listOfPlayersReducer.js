import { defaultState } from "../defaultStates";

export function setAllPlayers(listOfPlayers) {
  return {
    type: "SET_ALL_PLAYERS",
    payload: listOfPlayers,
  };
}
export function listOfPlayersReducer(state = defaultState.listOfPlayers, action) {
  switch (action.type) {
    case "SET_ALL_PLAYERS":
      return action.payload;
    default:
      return state;
  }
}

export function upgradeAge(player) {
  const age1 = new Date();
  const age2 = Date.parse(player.age);
  const newAge = Math.floor((age1 - age2) / (1000 * 60 * 60 * 24 * 30 * 12));
  const newPlayer = { ...player, age: newAge };
  return newPlayer;
}
