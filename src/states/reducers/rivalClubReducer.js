import { defaultState } from "../defaultStates";

export function setRivalTeam(listOfTeams, team) {
  return {
    type: "SET_RIVAL_TEAM",
    payload: { listOfTeams, team },
  };
}
export function setResetRivalTeam(team) {
  return {
    type: "RESET_RIVAL_TEAM",
    payload: team,
  };
}
export function rivalClubReducer(state = defaultState.rivalClub, action) {
  switch (action.type) {
    case "SET_RIVAL_TEAM":
      return action.payload.listOfTeams.find(
        (teams) => teams.id === action.payload.team.id
      );
    case "RESET_RIVAL_TEAM":
      return action.payload;
    default:
      return state;
  }
}
