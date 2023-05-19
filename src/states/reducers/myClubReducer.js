import { defaultState } from "../defaultStates";

export function setMyTeam(listOfTeams, name) {
  return {
    type: "SET_MY_TEAM",
    payload: { listOfTeams, name },
  };
}
export function setResetMyTeam(team) {
  return {
    type: "RESET_MY_TEAM",
    payload: team,
  };
}
export function myClubReducer(state = defaultState.myClub, action) {
  switch (action.type) {
    case "SET_MY_TEAM":
      return action.payload.listOfTeams.find((teams) => teams.name === action.payload.name);
    case "RESET_MY_TEAM":
      return action.payload;
    default:
      return state;
  }
}
