import { defaultState } from "../defaultStates";

export function setShowPersonalInfo(boolean) {
  return {
    type: "SET_SHOW_PERSONAL_INFO",
    payload: boolean,
  };
}

export function showPersonalInfoReducer(
  state = defaultState.showPersonalInfo,
  action
) {
  switch (action.type) {
    case "SET_SHOW_PERSONAL_INFO":
      return action.payload;
    default:
      return state;
  }
}
