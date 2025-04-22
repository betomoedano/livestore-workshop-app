import { useStore } from "@livestore/react";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Note as INote } from "@workshop/shared/schema";
import { events } from "@workshop/shared/schema";
import { Link } from "expo-router";

export const Note: React.FC<INote> = ({ id, title, content, createdBy }) => {
  const { store } = useStore();

  const handleDeleteNote = () =>
    store.commit(events.noteDeleted({ id, deletedAt: new Date() }));

  return (
    <Link
      href={{
        pathname: "/[note]",
        params: {
          note: id,
        },
      }}
      style={styles.container}
    >
      <View>
        <Text selectable style={styles.text}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "gray" }}>{content}</Text>
      </View>
      <Pressable onPress={handleDeleteNote}>
        <Text>Delete</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
