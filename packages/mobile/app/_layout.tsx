import "../polyfill.ts";
import React from "react";
import { nanoid } from "@livestore/livestore";
import { makePersistedAdapter } from "@livestore/adapter-expo";
import { LiveStoreProvider, useStore } from "@livestore/react";
import {
  Button,
  Text,
  unstable_batchedUpdates as batchUpdates,
  View,
  Switch,
  Pressable,
  Platform,
} from "react-native";
import { Stack } from "expo-router";

import { events, schema, tables } from "@workshop/shared/schema";
import { makeCfSync } from "@livestore/sync-cf";

// Hardcoded token for testing - valid for 24 hours
const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvIiwiaWF0IjoxNzEzMjQ5NjAwLCJleHAiOjE3MTMzMzYwMDB9.4Adcj3UFYcPpxga7Cp6AnuRwhk9xU3j3ZbXBp7fYH7E";

const syncUrl = Platform.select({
  default: process.env.EXPO_PUBLIC_LIVESTORE_SYNC_URL,
  android: process.env.EXPO_PUBLIC_LIVESTORE_SYNC_URL_ANDROID_LOCAL, // https://developer.android.com/studio/run/emulator-networking#networkaddresses
});

const adapter = makePersistedAdapter({
  sync: { backend: makeCfSync({ url: syncUrl }) },
});

export default function RootLayout() {
  const [, rerender] = React.useState({});
  const [synced, setSynced] = React.useState(false);

  return (
    <LiveStoreProvider
      schema={schema}
      storeId={synced ? "a" : undefined}
      // renderLoading={(_) => <Text>Loading LiveStore ({_.stage})...</Text>}
      renderLoading={(_) => <></>}
      renderError={(error: any) => <Text>Error: {error.toString()}</Text>}
      renderShutdown={() => {
        return (
          <View>
            <Text>LiveStore Shutdown</Text>
            <Button title="Reload" onPress={() => rerender({})} />
          </View>
        );
      }}
      boot={(store) => {
        if (store.query(tables.todos.count()) === 0) {
          store.commit(
            events.todoCreated({
              id: nanoid(),
              text: "🎥 Subscribe to @codewithbeto",
            })
          );
        }

        if (store.query(tables.note.count()) === 0) {
          store.commit(
            events.noteCreated({
              id: nanoid(),
              title: "My first note",
              content: "Hello, world!",
              createdBy: "beto",
            })
          );
        }
      }}
      adapter={adapter}
      batchUpdates={batchUpdates}
      syncPayload={{
        authToken: TEST_TOKEN,
      }}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerRight: ({ tintColor }) => {
              const { store } = useStore();
              return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Pressable
                    onPress={() =>
                      store.commit(
                        events.noteCreated({
                          id: nanoid(),
                          title: `new note ${Math.random().toFixed(3)}`,
                          content: "new note",
                          createdBy: "beto",
                        })
                      )
                    }
                  >
                    <Text
                      style={{
                        color: tintColor,
                        fontSize: 30,
                        marginRight: 10,
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                  <Switch
                    value={synced}
                    onValueChange={() => setSynced(!synced)}
                  />
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="[note]"
          options={{
            title: "Note",
          }}
        />
        <Stack.Screen
          name="reaction/[note]"
          options={{
            title: "Reaction",
            presentation: "formSheet",
            sheetAllowedDetents: [0.4, 0.7],
            headerShown: false,
            sheetGrabberVisible: true,
          }}
        />
      </Stack>
    </LiveStoreProvider>
  );
}
