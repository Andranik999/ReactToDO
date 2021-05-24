import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import firebase from "./firebase";
import "firebase/firestore";

let db = firebase.firestore();

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const res = await db
    .collection("todos")
    .orderBy("createdAt", "desc")
    .get();

  return res.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
});

export const createTodo = createAsyncThunk("todos/create", async title => {
  const id = uuidv4();

  await db
    .collection("todos")
    .doc(id)
    .set({ title, done: false, createdAt: Date.now() });

  return { id, title, done: false };
});

export const deleteTodo = createAsyncThunk("todos/delete", async id => {
  return db
    .collection("todos")
    .doc(id)
    .delete();
});

export const toggleAllTodos = createAsyncThunk("todo/toggle", async () => {
  // const response = await db.collection("todos").get();

  const activeTodos = await db
    .collection("todos")
    .where("done", "==", false)
    .get();
});

export const removeSelected = createAsyncThunk(
  "todo/removeSelected",
  async () => {
    const todosRef = db.collection("todos");
    const response = await todosRef.where("done", "==", true).get();

    await Promise.all(
      response.docs.map(({ id }) => {
        return todosRef.doc(id).delete();
      })
    );
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: []
  },

  reducers: {
    // toggleAllTodos: (state, _action) => {
    //   const activeTodos = state.todos.filter(todo => !todo.done);

    //   state.todos.forEach(todo => {
    //     todo.done = !!activeTodos.length;
    //   });

    // localStorage.setItem("todos", JSON.stringify(state.todos));
    // },

    edit: (state, { payload }) => {
      const todoToUpdate = state.todos.find(todo => todo.id === payload.id);

      if (todoToUpdate) {
        todoToUpdate.title = payload.title;
        todoToUpdate.done = payload.done;

        db.collection("todos")
          .doc(todoToUpdate.id)
          .set({ done: payload.done, title: payload.title }, { merge: true });

        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    }
  },
  extraReducers: {
    [fetchTodos.fulfilled.type]: (state, { payload }) => {
      state.status = "fulfilled";
      state.todos = payload;
    },
    [fetchTodos.pending.type]: (state, { payload }) => {
      state.status = "pending";
    },
    [fetchTodos.rejected.type]: (state, { payload }) => {
      state.status = "rejected";
    },
    [createTodo.fulfilled.type]: (state, { payload }) => {
      state.todos.unshift(payload);
    },
    [deleteTodo.fulfilled.type]: (state, { payload }) => {
      state.todos.splice(payload, 1);
    },
    [toggleAllTodos.fulfilled.type]: (state, { payload }) => {
      const activeTodos = state.todos.filter(todo => !todo.done);

      state.todos.forEach(todo => {
        todo.done = !!activeTodos.length;
      });
    },
    [removeSelected.fulfilled.type]: (state, { payload }) => {
      state.todos = state.todos.filter(todo => !todo.done);
    }
  }
});

export const { addTodo, edit } = todoSlice.actions;

export default todoSlice.reducer;
