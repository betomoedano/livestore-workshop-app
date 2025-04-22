import { queryDb } from "@livestore/livestore";
import { useQuery } from "@livestore/react";
import { tables } from "@workshop/shared/schema";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export const NoteReactions = ({ noteId }: { noteId: string }) => {
  const router = useRouter();
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

  if (regularReactions.length === 0 && superReactions.length === 0) {
    return null;
  }

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: "lightgray",
          marginVertical: 12,
        }}
      />
      <View style={styles.container}>
        {Object.entries(reactionCounts).map(([emoji, count]) => (
          <Pressable
            key={emoji}
            style={styles.reactionButton}
            onPress={() =>
              router.push({
                pathname: "/reaction/[note]",
                params: { note: noteId },
              })
            }
          >
            <Text style={styles.emojiText}>{emoji}</Text>
            {count > 1 && <Text style={styles.regularCountText}>{count}</Text>}
          </Pressable>
        ))}
        {Object.entries(superReactionCounts).map(([emoji, count]) => (
          <Pressable
            key={emoji}
            style={[styles.reactionButton, styles.superReactionButton]}
            onPress={() =>
              router.push({
                pathname: "/reaction/[note]",
                params: { note: noteId },
              })
            }
          >
            <Text style={styles.emojiText}>{emoji}</Text>
            {count > 1 && <Text style={styles.superCountText}>{count}</Text>}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 14,
  },
  reactionButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  superReactionButton: {
    backgroundColor: "#007AFF",
  },
  emojiText: {
    fontSize: 20,
    // marginRight: 4,
    fontVariant: ["tabular-nums"],
  },
  countText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  superCountText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    position: "absolute",
    right: -10,
    top: -10,
    backgroundColor: "#007AFF",
    borderWidth: 1,
    borderColor: "white",
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: "center",
  },
  regularCountText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    position: "absolute",
    right: -10,
    top: -10,
    backgroundColor: "#6b7280",
    borderWidth: 1,
    borderColor: "white",
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: "center",
  },
});
