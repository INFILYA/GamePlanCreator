import { createSlice } from "@reduxjs/toolkit";

export const indexOfZonesSlice = createSlice({
  name: "indexOfZones",
  initialState: {
    indexOfZones: [5, 2, 1, 0, 3, 4],
  },
  reducers: {
    setIndexOfZones: (state, action) => {
      state.indexOfZones = state.indexOfZones.filter((zone) => zone !== action.payload);
    },
    resetIndexOfZones: (state, action) => {
      state.indexOfZones = [
        ...state.indexOfZones,
        action.payload.zones.indexOf(action.payload.player),
      ];
    },
    setBackRightRivalSelects: (state, action) => {
      state.indexOfZones = action.payload;
    },
  },
});
export const { setIndexOfZones, resetIndexOfZones, setBackRightRivalSelects } =
  indexOfZonesSlice.actions;
export default indexOfZonesSlice.reducer;
