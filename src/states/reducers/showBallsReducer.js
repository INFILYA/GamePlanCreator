import { defaultState } from "../defaultStates";

export function setShowBalls(boolean) {
  return {
    type: "SET_SHOW_BALLS",
    payload: boolean,
  };
}

export function showBallsReducer(state = defaultState.showBalls, action) {
  switch (action.type) {
    case "SET_SHOW_BALLS":
      return action.payload;
    default:
      return state;
  }
}
