import { defaultState } from "../defaultStates";

export function setMyTeamPlayers(listOfPlayers, name) {
  return {
    type: "SET_MY_TEAM_PLAYERS",
    payload: { listOfPlayers, name },
  };
}
export function pushFromMyBoard(player) {
  return {
    type: "PUSH_FROM_MY_BOARD",
    payload: player,
  };
}
export function myTeamPlayersReducer(state = defaultState.myTeamPlayers, action) {
  switch (action.type) {
    case "SET_MY_TEAM_PLAYERS":
      return action.payload.listOfPlayers.filter(
        (players) => players.teamid === action.payload.name
      );
    case "PUSH_FROM_MY_BOARD":
      return state.filter((players) => players.id !== action.payload.id);
    default:
      return state;
  }
}
