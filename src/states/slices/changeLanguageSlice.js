import { createSlice } from "@reduxjs/toolkit";

export const changeLanguageSlice = createSlice({
  name: "changeLanguage",
  initialState: {
    changeLanguage: false,
  },
  reducers: {
    setChangeLanguage: (state, action) => {
      state.changeLanguage = action.payload;
    },
  },
});
export const { setChangeLanguage } = changeLanguageSlice.actions;
export default changeLanguageSlice.reducer;
