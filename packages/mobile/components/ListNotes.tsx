import React from "react";
import { nanoid, queryDb } from "@livestore/livestore";
import { useQuery } from "@livestore/react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { tables } from "@workshop/shared/schema";
import { Note } from "./NoteItem.tsx";

const visibleNotes$ = queryDb(
  (get) => {
    return tables.note.where({
      deletedAt: null,
    });
  },
  { label: "visibleNotes" }
);

export const ListNotes: React.FC = () => {
  const visibleNotes = useQuery(visibleNotes$);

  return (
    <FlatList
      data={visibleNotes}
      renderItem={({ item }) => <Note {...item} />}
      ListEmptyComponent={() => (
        <View
          style={{
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <Text style={{ color: "gray" }}>No notes yet!</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F2F2F7",
  },
});
