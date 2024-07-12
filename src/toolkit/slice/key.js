import { createSlice } from '@reduxjs/toolkit'

export const keySlice = createSlice({
  initialState: {},
  name: 'interface/key',
  reducers: {
    setKey: (state, action) => action.payload
  }
})

export const { setKey } = keySlice.actions;
export default keySlice.reducer;