import { createSlice } from "@reduxjs/toolkit";

export const tvSlice = createSlice({
  name: "tv",
  initialState: {
    info: {},
  },
  reducers: {
    loadTv: (state, action) => {
      state.info = action.payload;
    },
    removeTv: (state) => {
      state.info = {};
    },
  },
});

export const { loadTv, removeTv } = tvSlice.actions;

export default tvSlice.reducer;
