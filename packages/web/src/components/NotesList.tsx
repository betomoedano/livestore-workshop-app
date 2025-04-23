import { useQuery } from "@livestore/react";
import { visibleNotes$ } from "@workshop/shared/queries";

export function NotesList() {
  const visibleNotes = useQuery(visibleNotes$);
  return (
    <ul className="todo-list">
      {visibleNotes.length === 0 && <li>No notes</li>}
      {visibleNotes.map((note) => (
        <li key={note.id} style={{ display: "flex", gap: "10px" }}>
          <label htmlFor={note.id}>{note.title}</label>
        </li>
      ))}
    </ul>
  );
}
