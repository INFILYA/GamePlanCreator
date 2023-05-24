import { defaultState } from "../defaultStates";

export function setuserInfo(user) {
  return {
    type: "SET_USER_INFO",
    payload: user,
  };
}

export function userInfoReducer(state = defaultState.userInfo, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
}
