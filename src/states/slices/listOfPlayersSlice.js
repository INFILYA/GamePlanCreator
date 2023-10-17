import { createSlice } from "@reduxjs/toolkit";

export const listOfPlayersSlice = createSlice({
  name: "listOfPlayers",
  initialState: {
    listOfPlayers: [],
  },
  reducers: {
    setAllPlayers: (state, action) => {
      state.listOfPlayers = action.payload;
      localStorage.setItem("players", JSON.stringify(action.payload));
    },
  },
});
export const { setAllPlayers } = listOfPlayersSlice.actions;
export default listOfPlayersSlice.reducer;
