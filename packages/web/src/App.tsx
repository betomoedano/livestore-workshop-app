import "./App.css";
import { queryDb } from "@livestore/livestore";
import { app$ } from "@workshop/shared/queries";
import { tables } from "@workshop/shared/schema";
import { useQuery } from "@livestore/react";

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

  return (
    <>
      <h1>Todo</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {visibleTodos.map((todo) => (
          <code key={todo.id} style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              style={{
                backgroundColor: "black",
                accentColor: "black",
                color: "white",
              }}
            />
            {todo.text}
          </code>
        ))}
      </div>
    </>
  );
}

export default App;
