import { createSlice } from "@reduxjs/toolkit";

export const zonesSlice = createSlice({
  name: "zones",
  initialState: {
    zones: Array(6).fill(null),
  },
  reducers: {
    setRivalZones: (state, action) => {
      state.zones = state.zones.map((player, index) =>
        index === action.payload.zone ? action.payload.player : player
      );
    },
    resetRivalZones: (state, action) => {
      state.zones = state.zones.map((player) => (player?.name === action.payload.name ? null : player));
    },
    clearRivalZones: (state, action) => {
      state.zones = action.payload;
    },
    setRivalStartingSix: (state, action) => {
      const startingSix = action.payload.rivalTeam;
      const allPlayers = action.payload.rivalPlayers;
      const correctStartingSix = [];
      for (let i = 0; i < startingSix.length; i++) {
        for (let j = 0; j < allPlayers.length; j++) {
          if (startingSix[i] === allPlayers[j].name) {
            correctStartingSix.push(allPlayers[j]);
          }
        }
      }
      state.zones = correctStartingSix;
    },
  },
});
export const { setRivalZones, resetRivalZones, clearRivalZones, setRivalStartingSix } =
  zonesSlice.actions;
export default zonesSlice.reducer;
