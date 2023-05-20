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
      action.payload.map((player) =>
        typeof player.age === "string" ? (player.age = upgradeAge(player)) : ""
      );
      return action.payload;
    default:
      return state;
  }
}

function upgradeAge(age) {
  const age1 = new Date();
  const age2 = Date.parse(age.age);
  const newAge = Math.floor((age1 - age2) / (1000 * 60 * 60 * 24 * 30 * 12));
  return newAge;
}
