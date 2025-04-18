import React from "react";
import { useUserStore } from "../../context/stores";
import { userTables } from "@workshop/shared/user-schema";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  const store = useUserStore();

  const notes = store.query(userTables.notes.where({ deletedAt: null }));

  return (
    <View style={{ padding: 16 }}>
      {notes.length === 0 ? (
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            marginVertical: 20,
            color: "#666",
          }}
        >
          No notes yet. Create your first note!
        </Text>
      ) : (
        notes.map((note) => (
          <Link
            key={note.id}
            href={{
              pathname: "/(app)/[note]",
              params: { note: note.id },
            }}
            asChild
            style={{
              padding: 16,
              marginVertical: 8,
              backgroundColor: "#f8f9fa",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#e9ecef",
            }}
          >
            <Pressable>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}
              >
                {note.title || "Untitled Note"}
              </Text>
              <Text style={{ fontSize: 14, color: "#6c757d", marginBottom: 2 }}>
                ID: {note.id.substring(0, 8)}...
              </Text>
              <Text style={{ fontSize: 14, color: "#6c757d" }}>
                Access: {note.accessLevel}
              </Text>
            </Pressable>
          </Link>
        ))
      )}
    </View>
  );
}
