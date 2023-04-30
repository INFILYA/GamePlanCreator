import { defaultState } from "../defaultStates";

export function setRivalTeam(listOfTeams, team) {
  return {
    type: "SET_RIVAL_TEAM",
    payload: { listOfTeams, team },
  };
}
export function rivalClubReducer(state = defaultState.rivalClub, action) {
  switch (action.type) {
    case "SET_RIVAL_TEAM":
      return action.payload.listOfTeams.filter(
        (teams) => teams.id === action.payload.team.id
      );
    default:
      return state;
  }
}
