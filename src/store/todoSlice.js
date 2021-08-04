import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice ({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo (state, action) {
      state.todos = [...state.todos, action.payload];
    },
    removeTodo (state, action) {
      state.todos = state.todos.filter (todo => todo.id !== action.id);
    },
  },
});

export const todoActinos = todoSlice.actions;

export default todoSlice;
