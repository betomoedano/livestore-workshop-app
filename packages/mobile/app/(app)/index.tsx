import React from "react";
import { useUserStore } from "../../context/stores";
import { userTables } from "@workshop/shared/user-schema";
import { Text, View } from "react-native";

export default function Index() {
  const store = useUserStore();

  const notes = store.query(userTables.notes.where({ deletedAt: null }));

  console.log("notes", notes);

  return (
    <>
      {notes.map((note) => (
        <View key={note.id}>
          <Text>id: {note.id}</Text>
          <Text>title: {note.title}</Text>
          <Text>content: {note.content.slice(0, 30)}...</Text>
          <Text>ownerId: {note.ownerId}</Text>
          <Text>accessLevel: {note.accessLevel}</Text>
          <Text>createdAt: {note.createdAt.toISOString()}</Text>
          <Text>updatedAt: {note.updatedAt.toISOString()}</Text>
        </View>
      ))}
    </>
  );
}
