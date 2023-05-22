import { defaultState } from "../defaultStates";

export function setRivalZones(player, zone) {
  return {
    type: "SET_RIVAL_ZONES",
    payload: { player, zone },
  };
}
export function setRivalStartingSix(players, starters) {
  return {
    type: "SET_RIVAL_STARTING_SIX",
    payload: { players, starters },
  };
}
export function clearRivalZones(clear) {
  return {
    type: "CLEAR_RIVAL_ZONES",
    payload: clear,
  };
}
export function zonesReducer(state = defaultState.zones, action) {
  switch (action.type) {
    case "SET_RIVAL_ZONES":
      return state.map((player, index) =>
        index === action.payload.zone ? action.payload.player : player
      );
    case "SET_RIVAL_STARTING_SIX":
      const startingSix = action.payload.starters;
      const allPlayers = action.payload.players;
      const correctStartingSix = [];
      for (let i = 0; i < startingSix.length; i++) {
        for (let j = 0; j < allPlayers.length; j++) {
          if (startingSix[i] === allPlayers[j].id) {
            correctStartingSix.push(allPlayers[j]);
          }
        }
      }
      return correctStartingSix;
    case "CLEAR_RIVAL_ZONES":
      return action.payload;
    default:
      return state;
  }
}
