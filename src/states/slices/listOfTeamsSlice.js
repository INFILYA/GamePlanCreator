import { createSlice } from "@reduxjs/toolkit";

export const listOfTeamsSlice = createSlice({
  name: "listOfTeams",
  initialState: {
    listOfTeams: [],
  },
  reducers: {
    setAllTeams: (state, action) => {
      state.listOfTeams = action.payload;
    },
  },
});
export const { setAllTeams } = listOfTeamsSlice.actions;
export default listOfTeamsSlice.reducer;
