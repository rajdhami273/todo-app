import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: {},
  },
  reducers: {
    addUser(state, data) {
      state.user = data.payload;
    },
  },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
