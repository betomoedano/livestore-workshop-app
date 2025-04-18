import { useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useNoteStore } from "../../../context/stores";
import { noteEvents, noteTables } from "@workshop/shared/note-schema";

export default function Note() {
  const { note: noteId } = useLocalSearchParams();
  const store = useNoteStore();

  const noteFromStore = store.query(
    noteTables.note.where({ id: noteId as string })
  );
  const note = noteFromStore[0];

  const handleContentChange = (newContent: string) => {
    store.commit(
      noteEvents.noteUpdated({
        id: note.id,
        title: note.title,
        content: newContent,
        updatedAt: new Date(),
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text>Note {note.id}</Text>
      <Text>Note {note.title}</Text>

      <View style={styles.editContainer}>
        <TextInput
          style={styles.input}
          multiline
          onChangeText={handleContentChange}
          defaultValue={note.content}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  editContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    minHeight: 100,
    marginBottom: 10,
  },
});
