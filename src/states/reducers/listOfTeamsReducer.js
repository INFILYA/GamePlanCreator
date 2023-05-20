import { defaultState } from "../defaultStates";

export function setAllTeams(listOfTeams) {
  return {
    type: "SET_ALL_TEAMS",
    payload: listOfTeams,
  };
}
export function listOfTeamsReducer(state = defaultState.listOfTeams, action) {
  switch (action.type) {
    case "SET_ALL_TEAMS":
      return action.payload;
    default:
      return state;
  }
}
