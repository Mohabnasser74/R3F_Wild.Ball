import { createSlice } from '@reduxjs/toolkit'

export const restartSlice = createSlice({
  initialState: "",
  name: 'interface/ballPosition',
  reducers: {
    setRestart: (state, action) => action.payload
  }
})

export const { setRestart } = restartSlice.actions;
export default restartSlice.reducer;