import { defaultState } from "../defaultStates";

export function setShowEmailField(boolean) {
  return {
    type: "SET_SHOW_EMAIL_FIELD",
    payload: boolean,
  };
}

export function showEmailFieldReducer(state = defaultState.showEmailField, action) {
  switch (action.type) {
    case "SET_SHOW_EMAIL_FIELD":
      return action.payload;
    default:
      return state;
  }
}