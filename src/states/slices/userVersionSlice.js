import { createSlice } from "@reduxjs/toolkit";

export const userVersionSlice = createSlice({
  name: "userVersion",
  initialState: {
    userVersion: null,
  },
  reducers: {
    setUserVersion: (state, action) => {
      state.userVersion = action.payload;
    },
  },
});
export const { setUserVersion } = userVersionSlice.actions;
export default userVersionSlice.reducer;
