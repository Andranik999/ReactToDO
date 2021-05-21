import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import firebase from "./firebase";
import "firebase/firestore";

let db = firebase.firestore();

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const res = await db.collection("todos").get();
  return res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: []
  },

  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        // id: uuidv4(),
        title: action.payload.title,
        done: false
      });
    },
    toggleAllTodos: (state, _action) => {
      const activeTodos = state.todos.filter(todo => !todo.done);

      state.todos.forEach(todo => {
        todo.done = !!activeTodos.length;
      });

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    remove: (state, { payload }) => {
      const index = state.todos.findIndex(todo => todo.id !== payload.id);
      state.todos.splice(index, 1);

      localStorage.setItem("todos", JSON.stringify(state.todos));
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
  },
  extraReducers: {
    [fetchTodos.fulfilled.type]: (state, { payload }) => {
      state.status = "fulfilled";
      state.todos = payload;
    }
  }
});

export const {
  addTodo,
  remove,
  removeSelected,
  edit,
  toggleAllTodos
} = todoSlice.actions;

export default todoSlice.reducer;
