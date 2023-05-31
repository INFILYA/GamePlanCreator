import { createSlice } from "@reduxjs/toolkit";

export const rivalPlayersSlice = createSlice({
  name: "rivalPlayers",
  initialState: {
    rivalPlayers: [],
  },
  reducers: {
    setRivalPlayers: (state, action) => {
      state.rivalPlayers = action.payload.listOfPlayers.filter(
        (players) => players.teamid === action.payload.club.name
      );
    },
    resetRivalPlayers: (state, action) => {
      state.rivalPlayers = action.payload;
    },
    pushToRivalBoard: (state, action) => {
      state.rivalPlayers = state.rivalPlayers.filter(
        (players) => players.id !== action.payload.id
      );
    },
    pushFromRivalBoard: (state, action) => {
      state.rivalPlayers = [...state.rivalPlayers, action.payload];
    },
    setBenchPlayers: (state, action) => {
      state.rivalPlayers = action.payload.rivalPlayers.filter(
        (player) => !action.payload.rivalTeam.some((startPlayer) => startPlayer === player.name)
      );
    },
  },
});
export const {
  setRivalPlayers,
  resetRivalPlayers,
  pushToRivalBoard,
  pushFromRivalBoard,
  setBenchPlayers,
} = rivalPlayersSlice.actions;
export default rivalPlayersSlice.reducer;
