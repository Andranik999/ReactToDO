import { useState, useRef, useEffect } from "react";

export const TodoItem = ({ todo, onRemove, toggleTodoDone }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const inputRef = useRef();

  const handleDoubleClick = e => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleChange = e => {
    setTitle(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Escape") {
      setIsEditing(false);
      setTitle("");
    }
    if (e.key === "Enter") {
      const trimmedText = title.trim();

      if (trimmedText) {
        todo.title = trimmedText;
        setIsEditing(false);
      }
    }
  };

  return (
    <li onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          ref={inputRef}
          onChange={handleChange}
          value={title}
          onKeyDown={handleKeyDown}
          className="editable-input"
          type="text"
        />
      ) : (
        <>
          <div className="check" onClick={() => toggleTodoDone(todo.id)}>
            {todo.done && <span>✓</span>}
          </div>
          <div
            className="todo-title"
            style={{ textDecoration: todo.done ? "line-through" : "" }}
          >
            {todo.title}
          </div>
          <div className="remove-todo" onClick={() => onRemove(todo.id)}>
            ✕
          </div>
        </>
      )}
    </li>
  );
};
