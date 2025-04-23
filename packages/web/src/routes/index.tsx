import { createFileRoute, redirect } from "@tanstack/react-router";
import { use, useState } from "react";
import { AuthContext } from "../context/auth";

import { makePersistedAdapter } from "@livestore/adapter-web";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";
import LiveStoreWorker from "../livestore.worker.ts?worker";
import { LiveStoreProvider } from "@livestore/react";
import { events, schema, tables } from "@workshop/shared/schema.ts";
import { unstable_batchedUpdates } from "react-dom";
import { NotesList } from "../components/NotesList.tsx";
import { nanoid } from "@livestore/livestore";
const EXPO_CLUB_STORE_ID = "expo-club";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Index,
});

const adapter = makePersistedAdapter({
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
  storage: { type: "opfs" },
});

function Index() {
  const { user } = use(AuthContext);
  const [storeId, setStoreId] = useState<string>(user!.id);

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <div className="flex mb-4 border-b">
        <button
          className={`py-2 px-4 font-medium text-gray-500 hover:text-blue-600 ${
            storeId === user!.id ? "border-b-2 border-blue-600" : ""
          }`}
          onClick={() => setStoreId(user!.id)}
        >
          My store
        </button>
        <button
          className={`py-2 px-4 font-medium text-gray-500 hover:text-blue-600 ${
            storeId === EXPO_CLUB_STORE_ID ? "border-b-2 border-blue-600" : ""
          }`}
          onClick={() => setStoreId(EXPO_CLUB_STORE_ID)}
        >
          Expo Club
        </button>
        {storeId}
      </div>
      <LiveStoreProvider
        schema={schema}
        storeId={storeId}
        adapter={adapter}
        batchUpdates={unstable_batchedUpdates}
        renderLoading={({ stage }) => <div>Loading... {stage}</div>}
        renderShutdown={() => <div>Shutting down...</div>}
        boot={(store) => {
          if (storeId === EXPO_CLUB_STORE_ID) return;

          if (store.query(tables.note.count()) === 0) {
            store.commit(
              events.noteCreated({
                id: nanoid(),
                title: "My first note",
                content: "Hello, world!",
                createdBy: user!.name,
              })
            );
          }
        }}
        syncPayload={{
          authToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvIiwiaWF0IjoxNzEzMjQ5NjAwLCJleHAiOjE3MTMzMzYwMDB9.4Adcj3UFYcPpxga7Cp6AnuRwhk9xU3j3ZbXBp7fYH7E",
        }}
      >
        <NotesList />
      </LiveStoreProvider>
    </div>
  );
}
