import { createSlice } from '@reduxjs/toolkit'

export const timeSlice = createSlice({
  initialState: false,
  name: 'interface/time',
  reducers: {
    time: (state, action) => state = action.payload
  }
})

export const { time } = timeSlice.actions;
export default timeSlice.reducer;