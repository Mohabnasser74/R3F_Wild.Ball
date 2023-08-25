import { configureStore } from "@reduxjs/toolkit";
import restartSlice from "../restartSlice";
import keySlice from "../key";
import gameStatus from "../gameStatus";
import timeSlice from "../timeSlice";

export const store = configureStore({
  reducer: {
    restartGame: restartSlice,
    key: keySlice,
    gameStatus: gameStatus,
    time: timeSlice
  }
});
