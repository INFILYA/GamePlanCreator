import { defaultState } from "../defaultStates";

export function setRivalZones(player, zone) {
  return {
    type: "SET_RIVAL_ZONES",
    payload: { player, zone },
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
      for (let i = 0; i < state.length; i++) {
        if (i === action.payload.zone) {
          state[i] = action.payload.player;
        }
      }
      return state;
    case "CLEAR_RIVAL_ZONES":
      return action.payload;
    default:
      return state;
  }
}

