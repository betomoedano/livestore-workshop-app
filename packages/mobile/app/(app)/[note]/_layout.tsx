import { Redirect, Stack } from "expo-router";
import { use } from "react";
import { useLocalSearchParams } from "expo-router";
import { LiveStoreNoteProvider } from "../../../context/LiveStoreNoteProvider";

export default function NoteLayout() {
  const { note } = useLocalSearchParams();

  return (
    <LiveStoreNoteProvider noteId={note as string}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </LiveStoreNoteProvider>
  );
}
