import { createSlice } from "@reduxjs/toolkit";


export const gameSlice = createSlice({
  initialState: false,
  name: "interface/gameStatus",
  reducers: {
    gameStatus: (state, action) => state = action.payload,
  }
});

export const { gameStatus } = gameSlice.actions;
export default gameSlice.reducer;