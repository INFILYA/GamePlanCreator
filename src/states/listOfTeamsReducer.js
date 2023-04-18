const defaultState = {
  listOfTeams: [],
};
export function fetchTeams() {
  return function (dispatch) {
    fetch("http://localhost:3000/clubs")
      .then((res) => res.json())
      .then((json) => dispatch(setAllTeamss(json)));
  };
}
export function setAllTeamss(listOfTeams) {
  return {
    type: "SET_ALL_TEAMS",
    payload: listOfTeams,
  };
}
export function listOfTeamsReducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_ALL_TEAMS":
      return {
        ...state,
        listOfTeams: [...action.payload],
      };
    default:
      return state;
  }
}
