const defaultState = {
  listOfTeams: [],
};
// import { defaultState } from "./store";

// };
export function fetchTeams() {
  return function (dispatch) {
    fetch("http://localhost:3000/clubs")
      .then((res) => res.json())
      .then((json) => dispatch(setAllTeamss(json)));
  };
}
export function setAllTeamss(clubs) {
  return {
    type: "SET_ALL_TEAMS",
    payload: clubs,
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
