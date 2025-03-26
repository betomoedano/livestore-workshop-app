import "./App.css";
import { queryDb } from "@livestore/livestore";
import { app$ } from "@workshop/shared/queries";
import { mutations, tables } from "@workshop/shared/schema";
import { useQuery, useStore } from "@livestore/react";

const visibleTodos$ = queryDb(
  (get) => {
    const { filter } = get(app$);
    return tables.todos.query.where({
      deleted: null,
      // completed: filter === "all" ? undefined : filter === "completed",
    });
  },
  { label: "visibleTodos" }
);

function App() {
  const visibleTodos = useQuery(visibleTodos$);
  const { store } = useStore();

  return (
    <>
      <h1>Todos</h1>
      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", gap: "10px" }}>
            <input
              id={todo.id}
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                store.commit(
                  todo.completed
                    ? mutations.uncompleteTodo({ id: todo.id })
                    : mutations.completeTodo({ id: todo.id })
                )
              }
              style={{
                backgroundColor: "black",
                accentColor: "black",
                color: "white",
              }}
            />
            <label htmlFor={todo.id}>{todo.text}</label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
