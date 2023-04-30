import { defaultState } from "../defaultStates";

export function setMyTeam(listOfTeams, team) {
  return {
    type: "SET_MY_TEAM",
    payload: { listOfTeams, team },
  };
}
export function myClubReducer(state = defaultState.myClub, action) {
  switch (action.type) {
    case "SET_MY_TEAM":
      return action.payload.listOfTeams.filter(
        (teams) => teams.id === action.payload.team.id
      );
    default:
      return state;
  }
}
