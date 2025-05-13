import { use, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useRouter } from "expo-router";
import { useQuery, useStore } from "@livestore/react";
import { noteReactionCountsByEmoji$ } from "@workshop/shared/queries";
import { noteReactionsStyles } from "@workshop/shared/styles/note-reactions";
import { Ionicons } from "@expo/vector-icons";
import { events } from "@workshop/shared/schema";
import { nanoid } from "@livestore/livestore";
import { AuthContext } from "../context/auth";
import { ReactionParticles } from "./ReactionParticles";
import * as Haptics from "expo-haptics";

const reactionColors = ["#FF7E7E", "#7EB3FF", "#8FD28F", "#FFE07E", "#D7A0FF"];

export const NoteReactions = ({ noteId }: { noteId: string }) => {
  const { store } = useStore();
  const { user } = use(AuthContext);
  const router = useRouter();

  const reactionCounts = useQuery(noteReactionCountsByEmoji$(noteId));

  const [activeParticleEmoji, setActiveParticleEmoji] = useState<string | null>(
    null
  );

  function handleShowParticles(emoji: string) {
    setActiveParticleEmoji(emoji);
    setTimeout(() => {
      setActiveParticleEmoji(null);
    }, 1000);
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
        <Pressable
          style={noteReactionsStyles.reactionButton as ViewStyle}
          onPress={() =>
            router.push({
              pathname: "/reaction/[note]",
              params: { note: noteId },
            })
          }
        >
          <Ionicons name="happy-outline" size={24} color="gray" />
        </Pressable>

        {reactionCounts.map(({ emoji, regularCount, superCount }) => (
          <Pressable
            key={emoji}
            style={noteReactionsStyles.reactionButton as ViewStyle}
            onLongPress={() => {
              handleShowParticles(emoji);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              store.commit(
                events.noteReacted({
                  id: nanoid(),
                  noteId,
                  emoji,
                  type: "super",
                  createdBy: user!.name,
                })
              );
            }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              store.commit(
                events.noteReacted({
                  id: nanoid(),
                  noteId,
                  emoji,
                  type: "regular",
                  createdBy: user!.name,
                })
              );
            }}
          >
            <Text style={noteReactionsStyles.emojiText as TextStyle}>
              {emoji}
            </Text>
            {regularCount > 0 && (
              <Text
                style={[
                  noteReactionsStyles.regularCountText as TextStyle,
                  { width: 25, left: 10 },
                ]}
              >
                {regularCount}
              </Text>
            )}
            {superCount > 0 && (
              <Text
                style={[
                  noteReactionsStyles.superCountText as TextStyle,
                  { width: 25, right: -12, backgroundColor: "orange" },
                  // { top: 22, width: 25, backgroundColor: "orange" },
                ]}
              >
                {superCount}
              </Text>
            )}
            {activeParticleEmoji === emoji && (
              <ReactionParticles
                color={
                  reactionColors[
                    Math.floor(Math.random() * reactionColors.length)
                  ]
                }
              />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};
