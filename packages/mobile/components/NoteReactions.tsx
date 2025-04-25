import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@livestore/react";
import { noteReactions$ } from "@workshop/shared/queries";
import { noteReactionsStyles } from "@workshop/shared/styles/note-reactions";
import { groupReactionsByEmoji } from "@workshop/shared/utils/group-reactions";

export const NoteReactions = ({ noteId }: { noteId: string }) => {
  const router = useRouter();
  const regularReactions = useQuery(noteReactions$(noteId, "regular"));
  const superReactions = useQuery(noteReactions$(noteId, "super"));

  // Group reactions by emoji and count them
  const reactionCounts = groupReactionsByEmoji(regularReactions);
  const superReactionCounts = groupReactionsByEmoji(superReactions);

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
      <View style={noteReactionsStyles.container as ViewStyle}>
        {Object.entries(reactionCounts).map(([emoji, count]) => (
          <Pressable
            key={emoji}
            style={noteReactionsStyles.reactionButton as ViewStyle}
            onPress={() =>
              router.push({
                pathname: "/reaction/[note]",
                params: { note: noteId },
              })
            }
          >
            <Text style={noteReactionsStyles.emojiText as TextStyle}>
              {emoji}
            </Text>
            {(count as number) > 1 && (
              <Text style={noteReactionsStyles.regularCountText as TextStyle}>
                {count as number}
              </Text>
            )}
          </Pressable>
        ))}
        {Object.entries(superReactionCounts).map(([emoji, count]) => (
          <Pressable
            key={emoji}
            style={[
              noteReactionsStyles.reactionButton,
              noteReactionsStyles.superReactionButton,
            ]}
            onPress={() =>
              router.push({
                pathname: "/reaction/[note]",
                params: { note: noteId },
              })
            }
          >
            <Text style={noteReactionsStyles.emojiText as TextStyle}>
              {emoji}
            </Text>
            {(count as number) > 1 && (
              <Text style={noteReactionsStyles.superCountText as TextStyle}>
                {count as number}
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};
