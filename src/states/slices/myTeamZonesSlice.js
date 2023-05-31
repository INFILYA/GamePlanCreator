import { createSlice } from "@reduxjs/toolkit";

export const myTeamZonesSlice = createSlice({
  name: "myTeamZones",
  initialState: {
    myTeamZones: Array(6).fill(null),
  },
  reducers: {
    setMyTeamZones: (state, action) => {
      state.myTeamZones = state.myTeamZones.map((player, index) =>
        index === action.payload.zone ? action.payload.player : player
      );
    },
    resetMyTeamZones: (state, action) => {
      state.myTeamZones = state.myTeamZones.map((player) =>
        player?.name === action.payload.name ? null : player
      );
    },
    clearMyTeamZones: (state, action) => {
      state.myTeamZones = action.payload;
    },
    rotateForwardMyTeam: (state , action) => {
      const Zone = [...state.myTeamZones];
      const newRot = [Zone[3], Zone[0], Zone[1], Zone[4], Zone[5], Zone[2]];
      state.myTeamZones = newRot;
    },
    rotateBackMyTeam: (state , action) => {
      const zone = [...state.myTeamZones];
      console.log(state.myTeamZones)
      const newRot2 = [zone[1], zone[2], zone[5], zone[0], zone[3], zone[4]];
      state.myTeamZones = newRot2;
    },
  },
});
export const {
  setMyTeamZones,
  resetMyTeamZones,
  clearMyTeamZones,
  rotateForwardMyTeam,
  rotateBackMyTeam,
} = myTeamZonesSlice.actions;
export default myTeamZonesSlice.reducer;
