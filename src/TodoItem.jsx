import { useState, useRef, useEffect } from "react";

export const TodoItem = ({ todo, onRemove, toggleTodoDone, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const inputRef = useRef();

  const handleDoubleClick = e => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setTitle(todo.title);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleChange = e => {
    setTitle(e.target.value);
  };

  const handleEdit = e => {
    if (e.key === "Escape") {
      setIsEditing(false);
      setTitle("");
    }

    if (e.key === "Enter") {
      const trimmedText = title.trim();

      if (trimmedText) {
        editTodo(todo, trimmedText);
        setIsEditing(false);
      }
    }
  };

  return (
    <li onDoubleClick={handleDoubleClick} onBlur={handleBlur}>
      {isEditing ? (
        <input
          ref={inputRef}
          onChange={handleChange}
          value={title}
          onKeyDown={handleEdit}
          className="editable-input"
          type="text"
          style={{ outline: 0 }}
        />
      ) : (
        <>
          <div className="check" onClick={() => toggleTodoDone(todo)}>
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
