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
export function setBenchPlayers(players, starters) {
  return {
    type: "SET_BENCH_PLAYERS",
    payload: { players, starters },
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
      return action.payload.players.filter(
        (player) =>
          !action.payload.starters.some(
            (startPlayer) => startPlayer.id === player.id
          )
      );
    default:
      return state;
  }
}
// rivalPlayers.filter(
//   (player) =>
//     !rivalClub.startingSquad.some(
//       (copyPlayer) => copyPlayer.id === player.id
//     )
