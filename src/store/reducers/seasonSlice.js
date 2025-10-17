import { createSlice } from "@reduxjs/toolkit";

export const seasonSlice = createSlice({
  name: "season",
  initialState: {
    info: {},
  },
  reducers: {
    loadSeason: (state, action) => {
      state.info = action.payload;
    },
    removeSeason: (state) => {
      state.info = {};
    },
  },
});

export const { loadSeason, removeSeason } = seasonSlice.actions;

export default seasonSlice.reducer;
