import { createSlice } from '@reduxjs/toolkit'

export const keySlice = createSlice({
  initialState: {},
  name: 'interface/keyboard',
  reducers: {
    key: (state, action) => {
      return (state = action.payload);
    }
  },
})

export const { key } = keySlice.actions;
export default keySlice.reducer;