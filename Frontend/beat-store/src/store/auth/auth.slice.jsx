import { createSlice } from "@reduxjs/toolkit";

//Slice responsible for bookmarking and unbookmarking audio items
const initialState = {
  jwtToken: "",
  roles: [],
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInfo(state, action) {
      state.jwtToken = action.payload.token;
      state.roles = action.payload.roles;
      state.userName = action.payload.userName;
    },
    clearAuthInfo(state) {
      state.jwtToken = "";
      state.roles = [];
      state.userName = "";
    },
  },
});

export const { setAuthInfo, clearAuthInfo } = authSlice.actions;
export default authSlice.reducer;
