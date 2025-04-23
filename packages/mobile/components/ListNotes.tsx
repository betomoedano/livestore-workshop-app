import React from "react";
import { useQuery } from "@livestore/react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Note } from "./NoteItem.tsx";
import { visibleNotes$ } from "@workshop/shared/queries.ts";

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
    padding: 16,
    backgroundColor: "#F2F2F7",
  },
});
