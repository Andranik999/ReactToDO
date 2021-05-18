import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: []
  },
  reducers: {
    getTodos: (state, _action) => {
      state.todos = JSON.parse(localStorage.getItem("todos")) || [];
    },
    addTodo: (state, action) => {
      state.todos.push({
        id: uuidv4(),
        title: action.payload.title,
        done: false
      });
    },
    toggleAllTodos: (state, { payload }) => {
      const activeTodos = state.todos.filter(todo => !todo.done);

      state.todos.forEach(todo => {
        todo.done = !!activeTodos.length;
      });

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    remove: (state, { payload }) => {
      const index = state.todos.findIndex(todo => todo.id !== payload.id);
      state.todos.splice(index, 1);
    },
    removeSelected: (state, _action) => {
      state.todos = state.todos.filter(todo => !todo.done);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    edit: (state, { payload }) => {
      const todoToUpdate = state.todos.find(todo => todo.id === payload.id);

      if (todoToUpdate) {
        todoToUpdate.title = payload.title;
        todoToUpdate.done = payload.done;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    }
  }
});

export const {
  addTodo,
  remove,
  removeSelected,
  edit,
  toggleAllTodos,
  getTodos
} = todoSlice.actions;

export default todoSlice.reducer;
