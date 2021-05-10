import React from "react";

export const TodoList = ({ todos, deleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="checkbox" className="check"></input>
          <div className="remove-todo">X</div>
          {todo}
        </li>
      ))}
    </ul>
  );
};
