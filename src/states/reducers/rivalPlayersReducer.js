import { defaultState } from "../defaultStates";

export function setRivalPlayers(listOfPlayers, players) {
  return {
    type: "SET_RIVAL_PLAYERS",
    payload: { listOfPlayers, players },
  };
}
export function pushFromRivalBoard(player) {
  return {
    type: "PUSH_FROM_RIVAL_BOARD",
    payload: player,
  };
}
export function setBenchPlayers(players) {
  return {
    type: "SET_BENCH_PLAYERS",
    payload: players,
  };
}
export function rivalPlayersReducer(state = defaultState.rivalPlayers, action) {
  switch (action.type) {
    case "SET_RIVAL_PLAYERS":
      return action.payload.listOfPlayers.filter(
        (players) => players.teamid === action.payload.players.name
      );
    case "PUSH_FROM_RIVAL_BOARD":
      return state.filter((players) => players.id !== action.payload.id);
    case "SET_BENCH_PLAYERS":
      return action.payload
    default:
      return state;
  }
}
