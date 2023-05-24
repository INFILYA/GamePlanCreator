import { defaultState } from "../defaultStates";

export function setisRegistratedUser(boolean) {
  return {
    type: "SET_IS_REGISTRATED_USER",
    payload: boolean,
  };
}

export function isRegistratedUserReducer(state = defaultState.isRegistratedUser, action) {
  switch (action.type) {
    case "SET_IS_REGISTRATED_USER":
      localStorage.setItem("isRegistratedUser", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
}
