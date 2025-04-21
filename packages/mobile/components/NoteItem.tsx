import { useStore } from "@livestore/react";
import * as React from "react";
import { StyleSheet, Text } from "react-native";

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
        pathname: "/note/[id]",
        params: {
          id,
        },
      }}
      style={styles.container}
    >
      <Text selectable style={styles.text}>
        {title}
      </Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
