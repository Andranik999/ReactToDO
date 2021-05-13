import { TodoItem } from "./TodoItem";

export const TodoList = ({
  todos,
  onRemove,
  toggleTodoDone,
  leftTasks,
  removeCompleted,
  setFilter,
  doneTodos
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
          />
        ))}
      </ul>

      <footer className="todo-info">
        <span className="todo-count">{leftTasks} items left</span>
        <ul className="filter">
          <li className="selectAll">
            <span onClick={() => setFilter("all")}>All</span>
          </li>
          <li className="active-todos">
            <span onClick={() => setFilter("active")}>Active</span>
          </li>
          <li className="completed-todos">
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
