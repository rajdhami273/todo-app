import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, data) => {
      state.todos.push(data.payload);
    },
    addAllTodos: (state, data) => {
      state.todos = data.payload;
    },
    updateTodo: (state, data) => {
      const todoToUpdateIndex = state.todos.findIndex(
        (item) => item._id === data.payload._id
      );
      state.todos[todoToUpdateIndex] = data.payload;
    },
  },
});

export const todoActions = todoSlice.actions;
export const todoReducers = todoSlice.reducer;
