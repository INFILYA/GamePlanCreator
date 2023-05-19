import { defaultState } from "../defaultStates";

export function setSequanceOfZones(index) {
  return {
    type: "SET_SEQUANCE_OF_ZONES",
    payload: index,
  };
}
export function setBackRightMyTeamSelects(rightZones) {
  return {
    type: "SET_BACK_RIGHT_MY_TEAM_SELECTS",
    payload: rightZones,
  };
}
export function sequanceOfZonesReducer(state = defaultState.sequanceOfZones, action) {
  switch (action.type) {
    case "SET_SEQUANCE_OF_ZONES":
      // console.log(action.payload);
      return state.filter((zone) => zone !== action.payload);
    case "SET_BACK_RIGHT_MY_TEAM_SELECTS":
      return action.payload;
    default:
      return state;
  }
}
