import { useStore } from "@livestore/react";
import { events } from "@workshop/shared/schema";
import { nanoid } from "@livestore/utils/nanoid";
import { AuthContext } from "../context/auth";
import { use, useState } from "react";

export const NoteInput = () => {
  const { user } = use(AuthContext);
  const { store } = useStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleCreateNote() {
    store.commit(
      events.noteCreated({
        id: nanoid(),
        title,
        content,
        createdBy: user?.name || "Unknown",
      })
    );
    setTitle("");
    setContent("");
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          padding: 12,
          marginBottom: 16,
          borderColor: "lightgray",
          borderWidth: 1,
          width: "400px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <input
            type="text"
            placeholder="New Note"
            style={{
              color: "#1f2937",
              marginBottom: 4,
              padding: "0px 8px",
              borderRadius: 5,
              border: "1px solid lightgray",
              textTransform: "capitalize",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="New Note Content"
            style={{
              color: "#6b7280",
              padding: "0px 8px",
              borderRadius: 5,
              border: "1px solid lightgray",
              marginBottom: 10,
              resize: "vertical",
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleCreateNote}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: 5,
              cursor: "pointer",
              border: "none",
            }}
          >
            Create Note
          </button>
        </div>
      </div>
    </div>
  );
};
