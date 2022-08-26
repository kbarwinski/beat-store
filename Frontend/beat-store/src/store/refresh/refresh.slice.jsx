import { createSlice } from "@reduxjs/toolkit";

//Slice responsible for marking components to refresh from any other place in the components tree
const initialState = {
  shouldRefresh: false,
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    toggleRefresh(state) {
      state.shouldRefresh = !state.shouldRefresh;
    },
  },
});

export const { toggleRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
