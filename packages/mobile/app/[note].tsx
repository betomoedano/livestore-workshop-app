import { View, TextInput, StyleSheet } from "react-native";
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
      <TextInput
        style={styles.titleInput}
        value={note.title ?? ""}
        onChangeText={handleEditTitle}
      />
      <TextInput
        style={styles.contentInput}
        value={note.content ?? ""}
        onChangeText={handleEditContent}
        multiline
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
});
