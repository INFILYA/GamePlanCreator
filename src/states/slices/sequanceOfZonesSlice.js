import { createSlice } from "@reduxjs/toolkit";

export const sequanceOfZonesSlice = createSlice({
  name: "sequanceOfZones",
  initialState: {
    sequanceOfZones: [5, 2, 1, 0, 3, 4],
  },
  reducers: {
    setSequanceOfZones: (state, action) => {
      state.sequanceOfZones = state.sequanceOfZones.filter((zone) => zone !== action.payload);
    },
    resetSequanceOfZones: (state, action) => {
      state.sequanceOfZones = [
        ...state.sequanceOfZones,
        action.payload.zones.indexOf(action.payload.player),
      ];
    },
    setBackRightMyTeamSelects: (state, action) => {
      state.sequanceOfZones = action.payload;
    },
  },
});
export const { setSequanceOfZones, resetSequanceOfZones, setBackRightMyTeamSelects } =
  sequanceOfZonesSlice.actions;
export default sequanceOfZonesSlice.reducer;
