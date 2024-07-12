import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  initialState: false,
  name: "interface/isRestartClick",
  reducers: {
    isRestartClick: (state, action) => action.payload
  }
});

export const { isRestartClick } = gameSlice.actions;
export default gameSlice.reducer;