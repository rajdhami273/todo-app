import { configureStore } from "@reduxjs/toolkit";

// reducers
import { userReducers } from "./user/userSlice";
import { todoReducers } from "./todos/todoSlice";

export const store = configureStore({
  reducer: {
    user: userReducers,
    todo: todoReducers,
  },
});
