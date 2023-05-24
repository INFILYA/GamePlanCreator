import { defaultState } from "../defaultStates";

export function setisShowedTutorial(boolean) {
  return {
    type: "SET_SHOWED_TUTORIAL",
    payload: boolean,
  };
}

export function isShowedTutorialReducer(state = defaultState.isShowedTutorial, action) {
  switch (action.type) {
    case "SET_SHOWED_TUTORIAL":
      localStorage.setItem("isShowedTutorial", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
}
