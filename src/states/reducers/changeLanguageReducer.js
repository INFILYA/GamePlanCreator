import { defaultState } from "../defaultStates";

export function setChangeLanguage(boolean) {
  return {
    type: "SET_CHANGE_LANGUAGE",
    payload: boolean,
  };
}

export function changeLanguageReducer(state = defaultState.showEmailField, action) {
  switch (action.type) {
    case "SET_CHANGE_LANGUAGE":
      return action.payload;
    default:
      return state;
  }
}
