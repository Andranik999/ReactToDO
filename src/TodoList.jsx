import React from "react";

export const TodoList = ({ todos, onRemove, toggleTodoDone }) => {
  return (
    <>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <div className="check" onClick={() => toggleTodoDone(todo.id)}>
              {todo.done && <span>✓</span>}
            </div>
            <div className="todo-title">{todo.title}</div>
            <div className="remove-todo" onClick={() => onRemove(todo.id)}>
              ✕
            </div>
          </li>
        ))}
      </ul>

      <footer className="todo-info">
        <span className="todo-count"></span>
        <ul className="filter">
          <li className="selectAll">
            <span>All</span>
          </li>
          <li className="active-todos">
            <span>Active</span>
          </li>
          <li className="completed-todos">
            <span>Completed</span>
          </li>
          <li>
            <span className="clearDone">Clear Completed</span>
          </li>
        </ul>
      </footer>
    </>
  );
};
