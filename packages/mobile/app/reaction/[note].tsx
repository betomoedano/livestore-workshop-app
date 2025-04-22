import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useStore } from "@livestore/react";
import { events, tables } from "@workshop/shared/schema";
import { nanoid, queryDb } from "@livestore/livestore";

const reactions = ["👍", "❤️", "🔥", "🚀", "💡", "💥"];

export default function ReactionScreen() {
  const { store } = useStore();
  const { note: noteId } = useLocalSearchParams() as { note: string };

  const note = store.useQuery(
    queryDb(tables.note.where({ id: noteId }).first(), { label: "noteById" })
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.subtitle}>
        Created {new Date(note.createdAt).toDateString()}
      </Text>

      <Text style={styles.subtitle}>
        Long press to super react to this note
      </Text>

      <View style={styles.reactionsContainer}>
        {reactions.map((reaction) => (
          <Pressable
            key={reaction}
            onPress={() =>
              store.commit(
                events.noteReacted({
                  id: nanoid(),
                  noteId: noteId,
                  emoji: reaction,
                  type: "regular",
                  createdBy: "beto",
                })
              )
            }
            onLongPress={() =>
              store.commit(
                events.noteReacted({
                  id: nanoid(),
                  noteId: noteId,
                  emoji: reaction,
                  type: "super",
                  createdBy: "beto",
                })
              )
            }
          >
            <ReactionItem key={reaction} reaction={reaction} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const ReactionItem = ({ reaction }: { reaction: string }) => {
  return (
    <View style={styles.reactionItem}>
      <Text>{reaction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  reactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  reactionItem: {
    padding: 16,
    borderRadius: 30,
    backgroundColor: "lightgray",
  },
  subtitle: {
    color: "gray",
  },
});
