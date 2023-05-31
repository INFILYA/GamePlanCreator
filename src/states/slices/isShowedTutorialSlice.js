import { createSlice } from "@reduxjs/toolkit";

export const isShowedTutorialSlice = createSlice({
  name: "isShowedTutorial",
  initialState: {
    isShowedTutorial: false,
  },
  reducers: {
    setisShowedTutorial: (state, action) => {
      state.isShowedTutorial = action.payload;
      localStorage.setItem("isShowedTutorial", JSON.stringify(action.payload));
    },
  },
});
export const { setisShowedTutorial } = isShowedTutorialSlice.actions;
export default isShowedTutorialSlice.reducer;
