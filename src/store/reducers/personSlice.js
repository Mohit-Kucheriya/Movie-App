import { createSlice } from "@reduxjs/toolkit";

export const personSlice = createSlice({
  name: "person",
  initialState: {
    info: {},
  },
  reducers: {
    loadPerson: (state, action) => {
      state.info = action.payload;
    },
    removePerson: (state) => {
      state.info = {};
    },
  },
});

export const { loadPerson, removePerson } = personSlice.actions;

export default personSlice.reducer;
