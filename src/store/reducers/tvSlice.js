import { createSlice } from "@reduxjs/toolkit";

export const tvSlice = createSlice({
  name: "tv",
  initialState: {
    info: null,
  },
  reducers: {
    loadTv: (state, action) => {
      state.info = action.payload;
    },
    removeTv: (state) => {
      state.info = null;
    },
  },
});

export const { loadTv, removeTv } = tvSlice.actions;

export default tvSlice.reducer;
