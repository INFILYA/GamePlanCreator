import { createSlice } from "@reduxjs/toolkit";

export const myClubSlice = createSlice({
  name: "myClub",
  initialState: {
    myClub: [],
  },
  reducers: {
    setMyTeam: (state, action) => {
      state.myClub = action.payload.listOfTeams.find(
        (teams) => teams.name === action.payload.value
      );
    },
    resetMyTeam: (state, action) => {
      state.myClub = action.payload;
    },
  },
});
export const { setMyTeam, resetMyTeam } = myClubSlice.actions;
export default myClubSlice.reducer;
