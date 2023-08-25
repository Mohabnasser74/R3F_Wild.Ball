import { createSlice } from '@reduxjs/toolkit'

export const timeRef = createSlice({
  initialState: " ",
  name: 'interface/timeR',
  reducers: {
    timeR: (state, action) => state = action.payload
  }
})

export const { timeR } = timeRef.actions;
export default timeRef.reducer;