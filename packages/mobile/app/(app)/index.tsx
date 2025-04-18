import React from "react";
import { useUserStore } from "../../context/stores";
import { userTables } from "@workshop/shared/user-schema";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  const store = useUserStore();

  const notes = store.query(userTables.notes.where({ deletedAt: null }));

  console.log("notes", notes);

  return (
    <>
      {notes.map((note) => (
        <Link
          key={note.id}
          href={{
            pathname: "/(app)/[note]",
            params: { note: note.id },
          }}
        >
          <Text>id: {note.id}</Text>
          <Text>title: {note.title}</Text>
          <Text>accessLevel: {note.accessLevel}</Text>
        </Link>
      ))}
    </>
  );
}
