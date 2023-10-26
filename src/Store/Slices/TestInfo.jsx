import { createSlice } from "@reduxjs/toolkit";

const testInfo = createSlice({
  name: "testdetails",
  initialState: [],
  reducers: {
    addName: (state, action) => {
      state.unshift({ name: action.payload });
    },

    addResult: (state, action) => {
      state.unshift({ result: action.payload });
    },
  },
});

export const { addName, addResult } = testInfo.actions;

export default testInfo.reducer;
