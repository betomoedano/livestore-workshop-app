import { useStore } from "@livestore/react";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Note as INote } from "@workshop/shared/schema";
import { events } from "@workshop/shared/schema";
import { Link, router } from "expo-router";
import { NoteReactions } from "./NoteReactions";

export const Note: React.FC<INote> = ({ id, title, content, createdBy }) => {
  const { store } = useStore();

  const handleDeleteNote = () =>
    store.commit(events.noteDeleted({ id, deletedAt: new Date() }));

  return (
    <Link
      href={{
        pathname: "/[note]",
        params: {
          note: id,
        },
      }}
      onLongPress={() => {
        router.push({
          pathname: "/reaction/[note]",
          params: {
            note: id,
          },
        });
      }}
      style={styles.container}
    >
      <View style={{ width: "100%" }}>
        <Text selectable style={styles.title} numberOfLines={1}>
          {title || "Untitled"}
        </Text>
        <Text style={styles.content} numberOfLines={3}>
          {content || "No content"}
        </Text>

        {/* <Pressable style={styles.deleteButton} onPress={handleDeleteNote}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable> */}
        <NoteReactions noteId={id} />
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "lightgray",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  content: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 20,
  },
  deleteButton: {
    backgroundColor: "#fee2e2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteText: {
    color: "#ef4444",
    fontWeight: "500",
    fontSize: 14,
  },
});
