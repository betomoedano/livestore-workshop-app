import { View, TextInput, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useStore } from "@livestore/react";
import { events, tables } from "@workshop/shared/schema";
import { queryDb } from "@livestore/livestore";
import React from "react";

export default function Note() {
  const { store } = useStore();
  const { note: noteId } = useLocalSearchParams() as { note: string };

  const note = store.useQuery(
    queryDb(tables.note.where({ id: noteId }).first(), { label: "noteById" })
  );

  const handleEditTitle = (title: string) => {
    store.commit(events.noteTitleUpdated({ id: noteId, title }));
  };

  const handleEditContent = (content: string) => {
    store.commit(events.noteContentUpdated({ id: noteId, content }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.noteCard}>
        <TextInput
          style={styles.titleInput}
          value={note.title ?? ""}
          onChangeText={handleEditTitle}
          placeholder="Note title"
        />
        <TextInput
          style={styles.contentInput}
          value={note.content ?? ""}
          onChangeText={handleEditContent}
          multiline
          textAlignVertical="top"
          placeholder="Write your note here..."
          maxLength={500}
        />
        {note.createdBy && (
          <Text style={styles.authorText}>By {note.createdBy}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f7fa",
  },
  noteCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  contentInput: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    padding: 8,
  },
  authorText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 12,
    textAlign: "right",
    fontStyle: "italic",
  },
});
