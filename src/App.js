import React, { useState } from "react";
import { Footer } from "./Footer";
import { TodoList } from "./TodoList.jsx";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      const trimmedText = value.trim();

      if (trimmedText) {
        setTodos([trimmedText, ...todos]);
        setValue("");
      }
    }
  };

  return (
    <>
      <section className="todo-app">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done"
            onChange={handleChange}
            value={value}
            onKeyDown={handleKeyDown}
          />
        </header>
        <section className="main-todos">
          <TodoList todos={todos} />
        </section>
      </section>
      <Footer />
    </>
  );
};

export default App;
