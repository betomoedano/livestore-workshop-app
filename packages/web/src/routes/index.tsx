import { useQuery } from "@livestore/react";
import { createFileRoute } from "@tanstack/react-router";
import { visibleNotes$ } from "@workshop/shared/queries";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const visibleNotes = useQuery(visibleNotes$);

  return (
    <>
      <h1>Notes</h1>
      <ul className="todo-list">
        {visibleNotes.map((note) => (
          <li key={note.id} style={{ display: "flex", gap: "10px" }}>
            <label htmlFor={note.id}>{note.title}</label>
          </li>
        ))}
      </ul>
    </>
  );
}
