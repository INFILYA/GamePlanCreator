import { createSlice } from "@reduxjs/toolkit";

export const playerInfoSlice = createSlice({
  name: "playerInfo",
  initialState: {
    playerInfo: null,
  },
  reducers: {
    setInfoOfPlayer: (state, action) => {
      state.playerInfo = action.payload;
    },
  },
});
export const { setInfoOfPlayer } = playerInfoSlice.actions;
export default playerInfoSlice.reducer;
