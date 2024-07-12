import { configureStore } from "@reduxjs/toolkit";

import keyReducer from "./slice/key";
import doRestart from "./slice/Restart";
import isRestart from "./slice/RestartClicked";

export const store = configureStore({
  reducer: {
    key: keyReducer,
    Restart: doRestart,
    isRestart: isRestart
  }
});
