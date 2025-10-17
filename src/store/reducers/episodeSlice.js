import { createSlice } from "@reduxjs/toolkit";

export const episodeSlice = createSlice({
  name: "episode",
  initialState: {
    info: {},
  },
  reducers: {
    loadEpisode: (state, action) => {
      state.info = action.payload;
    },
    removeEpisode: (state) => {
      state.info = {};
    },
  },
});

export const { loadEpisode, removeEpisode } = episodeSlice.actions;

export default episodeSlice.reducer;
