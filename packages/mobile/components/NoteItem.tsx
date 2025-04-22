import { useStore } from "@livestore/react";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

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
          pathname: "/reaction/[reaction]",
          params: {
            reaction: "👍",
          },
        });
      }}
      style={styles.container}
    >
      <View>
        <Text selectable style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.content} numberOfLines={3}>
          {content}
        </Text>
        <Text style={styles.content}>By {createdBy}</Text>
        {/* <Pressable style={styles.deleteButton} onPress={handleDeleteNote}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable> */}
        <NoteReactions />
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
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
