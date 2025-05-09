import { use, useEffect, useState } from "react";
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
import { noteReactionCounts$, noteReactions$ } from "@workshop/shared/queries";
import { noteReactionsStyles } from "@workshop/shared/styles/note-reactions";
import { groupReactionsByEmoji } from "@workshop/shared/utils/group-reactions";
import { Ionicons } from "@expo/vector-icons";
import { events } from "@workshop/shared/schema";
import { nanoid, queryDb, Schema, sql } from "@livestore/livestore";
import { AuthContext } from "../context/auth";
import { ReactionParticles } from "./ReactionParticles";
import * as Haptics from "expo-haptics";

const reactionColors = ["#FF7E7E", "#7EB3FF", "#8FD28F", "#FFE07E", "#D7A0FF"];

export const NoteReactions = ({ noteId }: { noteId: string }) => {
  const { store } = useStore();
  const { user } = use(AuthContext);
  const router = useRouter();
  const regularReactions = useQuery(noteReactions$(noteId, "regular"));
  const superReactions = useQuery(noteReactions$(noteId, "super"));

  const reactionCounts = useQuery(
    queryDb(
      {
        query: sql`
        SELECT emoji, COUNT(*) AS count
        FROM reaction
        WHERE noteId = '${noteId}' AND type = 'regular'
        GROUP BY emoji
      `,
        schema: Schema.Array(
          Schema.Struct({
            emoji: Schema.String,
            count: Schema.Number,
          })
        ),
      },
      { label: `reaction-counts-${noteId}`, deps: [noteId] }
    )
  );

  // const superReactionCounts = useQuery(noteReactionCounts$(noteId, "super"));

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

        {reactionCounts.map(({ emoji, count }) => (
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
            {count > 1 && (
              <Text
                style={[
                  noteReactionsStyles.regularCountText as TextStyle,
                  { width: 25, left: 10 },
                ]}
              >
                {count}
              </Text>
            )}
            {/* {superReactionCounts[emoji] &&
              (superReactionCounts[emoji] as number) > 0 && (
                <Text
                  style={[
                    noteReactionsStyles.superCountText as TextStyle,
                    { width: 25, right: -12, backgroundColor: "orange" },
                    // { top: 22, width: 25, backgroundColor: "orange" },
                  ]}
                >
                  +{superReactionCounts[emoji] as number}
                </Text>
              )} */}
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
        {/* {Object.entries(superReactionCounts).map(([emoji, count]) => (
          <Pressable
            key={emoji}
            style={[
              noteReactionsStyles.reactionButton,
              noteReactionsStyles.superReactionButton,
            ]}
            onLongPress={() => handleShowParticles(emoji)}
            onPress={() =>
              store.commit(
                events.noteReacted({
                  id: nanoid(),
                  noteId,
                  emoji,
                  type: "super",
                  createdBy: user!.name,
                })
              )
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
            {activeParticleEmoji === emoji && (
              <ReactionParticles
                color={
                  reactionColors[Math.floor(Math.random() * reactionColors.length)]
                }
              />
            )}
          </Pressable>
        ))} */}
      </View>
    </View>
  );
};
