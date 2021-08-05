import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice ({
  name: 'todo',
  initialState: {
    todos: [
      {
        id: 1,
        text: 'Learn Redux',
      },
      {
        id: 2,
        text: 'Learn Web design',
      },
    ],
  },
  reducers: {
    addTodo (state, action) {
      console.log (action.payload);
      state.todos = [...state.todos, action.payload];
    },
    removeTodo (state, action) {
      const newList = state.todos.filter (todo => todo.id !== action.payload);
      state.todos = [...newList];
    },
    editTodo (state, action) {
      const {id: todoId, updatedText} = action.payload;

      let newList = [...state.todos];
      let currentTodo = newList.find (todo => todo.id === todoId);
      let currentTodoIndex = newList.findIndex (todo => todo.id === todoId);

      currentTodo.text = updatedText;
      newList[currentTodoIndex] = currentTodo;

      state.todos = [...newList];
    },
  },
});

export const todoActinos = todoSlice.actions;

export default todoSlice;
