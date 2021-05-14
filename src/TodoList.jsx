import { TodoItem } from "./TodoItem";

export const TodoList = ({
  todos,
  onRemove,
  toggleTodoDone,
  leftTasks,
  removeCompleted,
  setFilter,
  doneTodos,
  savedTodos,
  editTodo,
  filters
}) => {
  return (
    <>
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodoDone={toggleTodoDone}
            onRemove={onRemove}
            savedTodos={savedTodos}
            todos={todos}
            editTodo={editTodo}
          />
        ))}
      </ul>

      <footer className="todo-info">
        <span className="todo-count">{leftTasks} items left</span>
        <ul className="filter">
          <li className={filters === "all" ? "active" : "selectAll"}>
            <span onClick={() => setFilter("all")}>All</span>
          </li>
          <li className={filters === "active" ? "active" : "active-todos"}>
            <span onClick={() => setFilter("active")}>Active</span>
          </li>
          <li
            className={filters === "completed" ? "active" : "completed-todos"}
          >
            <span onClick={() => setFilter("completed")}>Completed</span>
          </li>
          <li>
            <span
              onClick={removeCompleted}
              style={{
                display: !doneTodos.length ? "none" : ""
              }}
            >
              {" "}
              Clear Completed
            </span>
          </li>
        </ul>
      </footer>
    </>
  );
};
