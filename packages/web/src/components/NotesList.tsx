import { useQuery } from "@livestore/react";
import { visibleNotes$ } from "@workshop/shared/queries";
import { noteItemStyles } from "@workshop/shared/styles/note-item";

export const NotesList = () => {
  const visibleNotes = useQuery(visibleNotes$);
  return (
    <ul>
      {visibleNotes.length === 0 && <li>No notes</li>}
      {visibleNotes.map((note) => (
        <li
          key={note.id}
          style={{ ...noteItemStyles.container, padding: "8px 12px" }}
        >
          <p
            style={{
              ...noteItemStyles.title,
              textTransform: "capitalize" as const,
            }}
          >
            {note.title || "Untitled"}
          </p>
          <p
            style={{
              ...noteItemStyles.content,
              lineHeight: "1.5",
            }}
          >
            {note.content || "No content"}
          </p>
          <button>Delete</button>
        </li>
      ))}
    </ul>
  );
};

// function NoteReactions({ noteId }: { noteId: string }) {

// }
