import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useNoteStore } from "../../../context/stores";
import { noteTables } from "@workshop/shared/note-schema";

export default function Note() {
  const { note: noteId } = useLocalSearchParams();
  const store = useNoteStore();

  const noteFromStore = store.query(
    noteTables.note.where({ id: noteId as string })
  );
  const note = noteFromStore[0];

  console.log("note from [note]/index.tsx", note);

  return (
    <View>
      <Text>Note {note.title}</Text>
    </View>
  );
}
