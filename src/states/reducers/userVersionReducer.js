import { defaultState } from "../defaultStates";

export function setUserVersion(version) {
  return {
    type: "SET_USER_VERSION",
    payload: version,
  };
}

export function userVersionReducer(state = defaultState.userVersion, action) {
  switch (action.type) {
    case "SET_USER_VERSION":
      return action.payload;
    default:
      return state;
  }
}
