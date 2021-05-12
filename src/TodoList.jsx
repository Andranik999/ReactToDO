import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, onRemove, toggleTodoDone, leftTasks }) => {
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
            <span>All</span>
          </li>
          <li className="active-todos">
            <span>Active</span>
          </li>
          <li className="completed-todos">
            <span>Completed</span>
          </li>
        </ul>
      </footer>
    </>
  );
};
