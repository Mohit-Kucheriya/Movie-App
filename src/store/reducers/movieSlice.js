import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    info: {},
  },
  reducers: {
    loadMovie: (state, action) => {
      state.info = action.payload;
    },
    removeMovie: (state) => {
      state.info = {};
    },
  },
});

export const { loadMovie, removeMovie } = movieSlice.actions;

export default movieSlice.reducer;
