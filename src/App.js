import React, { useState } from "react";
import { Footer } from "./Footer";
import { TodoList } from "./TodoList.jsx";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  const toggleTodoDone = id => {
    const copiedTodos = [...todos];

    copiedTodos.forEach(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
    });

    setTodos(copiedTodos);
  };

  const onRemove = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      const trimmedText = value.trim();

      if (trimmedText) {
        setTodos([{ title: trimmedText, done: false, id: uuidv4() }, ...todos]);
        setValue("");
      }
    }
  };

  const doneTodos = todos.filter(todo => todo.done);

  const leftTasks = todos.length - doneTodos.length;

  const toggleAll = () => {
    const toggledTodos = [...todos];
    if (!doneTodos.length) {
      toggledTodos.forEach(todo => {
        todo.done = !todo.done;
      });
    }
    if (doneTodos.length) {
      const notDone = toggledTodos.filter(todo => !todo.done);
      notDone.forEach(todo => {
        todo.done = !todo.done;
      });
    }
    if (doneTodos.length === toggledTodos.length) {
      toggledTodos.forEach(todo => {
        todo.done = !todo.done;
      });
    }
    setTodos(toggledTodos);
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
            todos={todos}
            toggleTodoDone={toggleTodoDone}
            onRemove={onRemove}
            leftTasks={leftTasks}
          />
        </section>
      </section>
      <Footer />
    </>
  );
};

export default App;
