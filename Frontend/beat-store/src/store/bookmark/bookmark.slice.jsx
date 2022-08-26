import { createSlice } from "@reduxjs/toolkit";

//Slice responsible for bookmarking and unbookmarking audio items
const initialState = {
  bookmarked: [],
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark(state, action) {
      state.bookmarked.push(action.payload);
    },
    removeBookmark(state, action) {
      state.bookmarked = state.bookmarked.filter((m) => m !== action.payload);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
