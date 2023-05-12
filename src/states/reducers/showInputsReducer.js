import { defaultState } from "../defaultStates";

export function setShowInputs(boolean) {
  return {
    type: "SET_SHOW_INPUTS",
    payload: boolean,
  };
}

export function showInputsReducer(state = defaultState.showInputs, action) {
  switch (action.type) {
    case "SET_SHOW_INPUTS":
      return action.payload;
    default:
      return state;
  }
}
