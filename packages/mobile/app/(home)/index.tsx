import React from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { visibleNotes$ } from "@workshop/shared/queries.ts";

import { use } from "react";
import { AuthContext } from "../../context/auth";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@livestore/react";
import { Note } from "../../components/NoteItem";

export default function Index() {
  const { signOut } = use(AuthContext);
  const visibleNotes = useQuery(visibleNotes$);

  return (
    <View style={{ flex: 1 }}>
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
      <Pressable
        onPress={signOut}
        style={{
          position: "absolute",
          bottom: 32,
          left: 16,
          width: 50,
          height: 50,
          backgroundColor: "#000",
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="log-out-outline" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F2F2F7",
  },
});
