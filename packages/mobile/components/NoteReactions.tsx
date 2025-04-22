import { queryDb } from "@livestore/livestore";
import { useQuery } from "@livestore/react";
import { tables } from "@workshop/shared/schema";
import { View, Text, StyleSheet, Pressable } from "react-native";

export const NoteReactions = ({ noteId }: { noteId: string }) => {
  const regularReactions = useQuery(
    queryDb(
      tables.reaction.where({
        noteId,
        type: "regular",
      }),
      { label: "reactions" }
    )
  );

  const superReactions = useQuery(
    queryDb(
      tables.reaction.where({
        noteId,
        type: "super",
      }),
      { label: "superReactions" }
    )
  );

  // Group reactions by emoji and count them
  const reactionCounts = regularReactions.reduce((acc, reaction) => {
    const { emoji } = reaction;
    if (!acc[emoji]) {
      acc[emoji] = 0;
    }
    acc[emoji]++;
    return acc;
  }, {} as Record<string, number>);

  const superReactionCounts = superReactions.reduce((acc, reaction) => {
    const { emoji } = reaction;
    if (!acc[emoji]) {
      acc[emoji] = 0;
    }
    acc[emoji]++;
    return acc;
  }, {} as Record<string, number>);

  return (
    <View style={styles.container}>
      {Object.entries(reactionCounts).map(([emoji, count]) => (
        <Pressable key={emoji} style={styles.reactionButton}>
          <Text style={styles.emojiText}>{emoji}</Text>
          <Text style={styles.countText}>{count}</Text>
        </Pressable>
      ))}
      {Object.entries(superReactionCounts).map(([emoji, count]) => (
        <Pressable key={emoji} style={[styles.reactionButton, { padding: 10 }]}>
          <Text style={[styles.emojiText, { fontSize: 22 }]}>{emoji}</Text>
          <Text style={[styles.countText, { fontSize: 18, fontWeight: "700" }]}>
            {count}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  reactionButton: {
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  emojiText: {
    fontSize: 16,
    marginRight: 4,
  },
  countText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
});
