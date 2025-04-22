import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useStore } from "@livestore/react";
import { tables } from "@workshop/shared/schema";
import { queryDb } from "@livestore/livestore";

export default function ReactionScreen() {
  const { store } = useStore();
  const { note: noteId } = useLocalSearchParams() as { note: string };

  const note = store.useQuery(
    queryDb(tables.note.where({ id: noteId }).first(), { label: "noteById" })
  );

  return (
    <View style={styles.container}>
      <Text>{note.title}</Text>
      <Text>{new Date(note.createdAt).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
