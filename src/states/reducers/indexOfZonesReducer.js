import { defaultState } from "../defaultStates";

export function setIndexOfZones(index) {
  return {
    type: "SET_INDEX_OF_ZONES",
    payload: index,
  };
}
export function setBackRightRivalSelects(rightZones) {
  return {
    type: "SET_BACK_RIGHT_RIVAL_SELECTS",
    payload: rightZones,
  };
}
export function indexOfZonesReducer(state = defaultState.indexOfZones, action) {
  switch (action.type) {
    case "SET_INDEX_OF_ZONES":
      return state.filter((zone) => zone !== action.payload);
    case "SET_BACK_RIGHT_RIVAL_SELECTS":
      return action.payload;
    default:
      return state;
  }
}
