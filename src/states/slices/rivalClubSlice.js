import { createSlice } from "@reduxjs/toolkit";

export const rivalClubSlice = createSlice({
  name: "rivalClub",
  initialState: {
    rivalClub: [],
  },
  reducers: {
    setRivalTeam: (state, action) => {
      state.rivalClub = action.payload.listOfTeams.find(
        (teams) => teams.id === action.payload.club.id
      );
    },
    resetRivalTeam: (state, action) => {
      state.rivalClub = action.payload;
    },
  },
});
export const { setRivalTeam, resetRivalTeam } = rivalClubSlice.actions;
export default rivalClubSlice.reducer;
  