import React, { useState, useEffect } from "react";
import { Footer } from "./Footer";
import { TodoList } from "./TodoList.jsx";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import firebase from "./firebase";
import "firebase/firestore";

import {
  addTodo,
  remove,
  removeSelected,
  edit,
  toggleAllTodos,
  fetchTodos
} from "./todoSlice";

const App = () => {
  const [value, setValue] = useState("");
  const [filters, setFilters] = useState("all");
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.todos);
  const doneTodos = todos.filter(todo => todo.done);
  const leftTasks = todos.length - doneTodos.length;

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const setFilter = type => {
    setFilters(type);
  };

  const filteredTodos = () => {
    return todos.filter(todo => {
      if (filters === "active") {
        return !todo.done;
      } else if (filters === "completed") {
        return todo.done;
      }

      return todos;
    });
  };

  const toggleTodoDone = todo => {
    dispatch(edit({ ...todo, done: !todo.done }));
  };

  const onRemove = todo => {
    dispatch(remove({ id: todo.id }));
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      const trimmedText = value.trim();

      if (trimmedText) {
        dispatch(
          addTodo({
            title: trimmedText
          })
        );
        let ref = firebase
          .firestore()
          .collection("todos")
          .doc();
        ref.set({ title: trimmedText, done: false }).then(setValue(""));
        localStorage.setItem(
          "todos",
          JSON.stringify([{ title: trimmedText, done: false }, ...todos])
        );

        setValue("");
      }
    }
  };
  const removeCompleted = () => {
    dispatch(removeSelected());
  };

  const editTodo = (todo, title) => {
    dispatch(edit({ ...todo, title }));
  };

  const toggleAll = todo => {
    dispatch(toggleAllTodos(todos, todo.title));
  };

  return (
    <>
      <section className="todo-app">
        <header className="header">
          <h1>todos</h1>
          <div className="toggle-All" onClick={toggleAll}>
            ⌄
          </div>
          <input
            className="new-todo"
            placeholder="What needs to be done ?"
            onChange={handleChange}
            value={value}
            onKeyDown={handleKeyDown}
          />
        </header>

        <section className="main-todos">
          <TodoList
            todos={filteredTodos()}
            toggleTodoDone={toggleTodoDone}
            onRemove={onRemove}
            leftTasks={leftTasks}
            removeCompleted={removeCompleted}
            setFilter={setFilter}
            doneTodos={doneTodos}
            editTodo={editTodo}
            filters={filters}
          />
        </section>
      </section>
      <Footer />
    </>
  );
};

export default App;
