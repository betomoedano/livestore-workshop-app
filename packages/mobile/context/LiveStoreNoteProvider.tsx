// LiveStoreNoteProvider.tsx
import React from "react";
import { LiveStoreProvider, useStore } from "@livestore/react";
import { NoteStoreContext } from "./stores";
import {
  noteSchema,
  noteTables,
  noteEvents,
} from "@workshop/shared/note-schema";
import { makePersistedAdapter } from "@livestore/adapter-expo";
import { makeCfSync } from "@livestore/sync-cf";
import { Store } from "@livestore/livestore";
import { unstable_batchedUpdates as batchUpdates, Text } from "react-native";
import { AuthContext } from "./Auth";
import { use } from "react";

export const LiveStoreNoteProvider: React.FC<{
  noteId: string;
  children: React.ReactNode;
}> = ({ noteId, children }) => {
  const auth = use(AuthContext);
  const user = auth?.user!;
  const adapter = React.useMemo(
    () =>
      makePersistedAdapter({
        sync: {
          backend: makeCfSync({
            url: process.env.EXPO_PUBLIC_LIVESTORE_SYNC_URL!,
          }),
        },
      }),
    []
  );
  const boot = React.useCallback(
    (store: Store) => {
      if (store.query(noteTables.note.count()) === 0) {
        store.commit(
          noteEvents.noteCreated({
            // placeholder content; real content arrives over sync
            id: noteId,
            title: "",
            content: "",
            createdAt: new Date(),
          })
        );
      }
    },
    [noteId]
  );

  return (
    <LiveStoreProvider
      schema={noteSchema}
      storeId={`note-${noteId}`}
      adapter={adapter}
      renderLoading={({ stage }) => <Text>Stage {stage}...</Text>}
      syncPayload={{ authToken: user.id, user: JSON.stringify(user), noteId }}
      boot={boot}
      batchUpdates={batchUpdates}
    >
      <InsideNoteStoreProvider>{children}</InsideNoteStoreProvider>
    </LiveStoreProvider>
  );
};

function InsideNoteStoreProvider({ children }: { children: React.ReactNode }) {
  const { store } = useStore();
  return (
    <NoteStoreContext.Provider value={store}>
      {children}
    </NoteStoreContext.Provider>
  );
}
