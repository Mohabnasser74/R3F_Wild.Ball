import { createSlice } from '@reduxjs/toolkit'

export const restartSlice = createSlice({
  initialState: {},
  name: 'interface/restart',
  reducers: {
    restart: (state, action) => state = action.payload
  }
})

export const { restart } = restartSlice.actions;
export default restartSlice.reducer;