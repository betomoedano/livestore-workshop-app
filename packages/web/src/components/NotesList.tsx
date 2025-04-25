import { use } from "react";
import { AuthContext } from "../context/auth";
import { nanoid } from "@livestore/utils/nanoid";
import { useQuery, useStore } from "@livestore/react";
import { events } from "@workshop/shared/schema";
import { noteItemStyles } from "@workshop/shared/styles/note-item";
import { noteReactions$, visibleNotes$ } from "@workshop/shared/queries";
import { noteReactionsStyles } from "@workshop/shared/styles/note-reactions";
import { groupReactionsByEmoji } from "@workshop/shared/utils/group-reactions";

export const NotesList = () => {
  const visibleNotes = useQuery(visibleNotes$);
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {visibleNotes.length === 0 && <li>No notes</li>}
      {visibleNotes.map((note) => (
        <li
          key={note.id}
          style={{
            ...noteItemStyles.container,
            padding: "8px 12px",
            width: "400px",
          }}
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
          <NoteReactions noteId={note.id} />
        </li>
      ))}
    </ul>
  );
};

function NoteReactions({ noteId }: { noteId: string }) {
  const { store } = useStore();
  const { user } = use(AuthContext);
  const regularReactions = useQuery(noteReactions$(noteId, "regular"));
  const superReactions = useQuery(noteReactions$(noteId, "super"));

  // Group reactions by emoji and count them
  const reactionCounts = groupReactionsByEmoji(regularReactions);
  const superReactionCounts = groupReactionsByEmoji(superReactions);

  if (regularReactions.length === 0 && superReactions.length === 0) {
    return null;
  }

  function handleReaction(emoji: string, type: "regular" | "super") {
    store.commit(
      events.noteReacted({
        id: nanoid(),
        noteId: noteId,
        emoji: emoji,
        type: type,
        createdBy: user!.name,
      })
    );
  }

  return (
    <div>
      <div style={dividerStyle} />
      <div style={containerStyle}>
        {Object.entries(reactionCounts).map(([emoji, count]) => (
          <button
            key={emoji}
            style={baseButtonStyle}
            onClick={() => handleReaction(emoji, "regular")}
          >
            <span style={emojiStyle}>{emoji}</span>
            {count > 1 && (
              <span
                style={{
                  ...noteReactionsStyles.regularCountText,
                  ...baseCountStyle,
                }}
              >
                {count}
              </span>
            )}
          </button>
        ))}
        {Object.entries(superReactionCounts).map(([emoji, count]) => (
          <button
            key={emoji}
            style={{
              ...baseButtonStyle,
              ...noteReactionsStyles.superReactionButton,
            }}
            onClick={() => handleReaction(emoji, "super")}
          >
            <span style={emojiStyle}>{emoji}</span>
            {count > 1 && (
              <span
                style={{
                  ...noteReactionsStyles.superCountText,
                  ...baseCountStyle,
                }}
              >
                {count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Common styles abstracted
const dividerStyle = {
  borderBottomWidth: "1px",
  borderColor: "lightgray",
  marginTop: "12px",
  marginBottom: "12px",
};

const containerStyle = {
  ...noteReactionsStyles.container,
  display: "flex",
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
};

const baseButtonStyle = {
  ...noteReactionsStyles.reactionButton,
  flexDirection: "row" as const,
  position: "relative" as const,
  padding: "4px 10px",
};

const emojiStyle = {
  fontSize: noteReactionsStyles.emojiText.fontSize,
};

const baseCountStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute" as const,
  textAlign: "center" as const,
};
