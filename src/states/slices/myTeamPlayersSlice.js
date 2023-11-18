import { createSlice } from "@reduxjs/toolkit";

export const myTeamPlayersSlice = createSlice({
  name: "myTeamPlayers",
  initialState: {
    myTeamPlayers: [],
  },
  reducers: {
    setMyTeamPlayers: (state, action) => {
      state.myTeamPlayers = action.payload.listOfPlayers.filter(
        (players) => players.teamid === action.payload.value
      );
    },
    resetMyTeamPlayers: (state, action) => {
      state.myTeamPlayers = action.payload;
    },
    pushToMyBoard: (state, action) => {
      state.myTeamPlayers = state.myTeamPlayers.filter(
        (players) => players.name !== action.payload.name
      );
    },
    pushFromMyBoard: (state, action) => {
      state.myTeamPlayers = [...state.myTeamPlayers, action.payload];
    },
  },
});
export const { setMyTeamPlayers, resetMyTeamPlayers, pushToMyBoard, pushFromMyBoard } = myTeamPlayersSlice.actions;
export default myTeamPlayersSlice.reducer;
