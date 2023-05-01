import { defaultState } from "../defaultStates";

export function setMyTeamZones(player, zone) {
  return {
    type: "SET_MY_TEAM_ZONES",
    payload: { player, zone },
  };
}
export function clearMyTeamZones(clear) {
  return {
    type: "CLEAR_MY_TEAM_ZONES",
    payload: clear,
  };
}
export function rotateForwardMyTeam() {
  return {
    type: "ROTATE_FORWARD_MY_TEAM",
  };
}
export function rotateBackMyTeam() {
  return {
    type: "ROTATE_BACK_MY_TEAM",
  };
}

export function myTeamZonesReducer(state = defaultState.myTeamZones, action) {
  switch (action.type) {
    case "SET_MY_TEAM_ZONES":
      for (let i = 0; i < state.length; i++) {
        if (i === action.payload.zone) {
          state[i] = action.payload.player;
        }
      }
      return state;
    case "CLEAR_MY_TEAM_ZONES":
      return action.payload;
    case "ROTATE_FORWARD_MY_TEAM":
      const Zone = [...state];
      const newRot = [Zone[3], Zone[0], Zone[1], Zone[4], Zone[5], Zone[2]];
      return newRot;
    case "ROTATE_BACK_MY_TEAM":
      const zone = [...state];
      const newRot2 = [zone[1], zone[2], zone[5], zone[0], zone[3], zone[4]];
      return newRot2;
    default:
      return state;
  }
}
