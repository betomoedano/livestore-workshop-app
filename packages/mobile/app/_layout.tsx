import "../polyfill.ts";
import React from "react";
import { nanoid } from "@livestore/livestore";
import { makePersistedAdapter } from "@livestore/adapter-expo";
import { LiveStoreProvider } from "@livestore/react";
import {
  Button,
  Text,
  unstable_batchedUpdates as batchUpdates,
  View,
} from "react-native";
import { Stack } from "expo-router";

import { events, schema, tables } from "@workshop/shared/schema";
import { makeCfSync } from "@livestore/sync-cf";

// Hardcoded token for testing - valid for 24 hours
const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvIiwiaWF0IjoxNzEzMjQ5NjAwLCJleHAiOjE3MTMzMzYwMDB9.4Adcj3UFYcPpxga7Cp6AnuRwhk9xU3j3ZbXBp7fYH7E";

const syncUrl = __DEV__
  ? process.env.EXPO_PUBLIC_LIVESTORE_SYNC_URL_LOCAL
  : process.env.EXPO_PUBLIC_LIVESTORE_SYNC_URL;

const adapter = makePersistedAdapter({
  sync: { backend: makeCfSync({ url: syncUrl }) },
});

export default function RootLayout() {
  const [, rerender] = React.useState({});

  return (
    <LiveStoreProvider
      schema={schema}
      storeId="a" // DB for each id
      renderLoading={(_) => <Text>Loading LiveStore ({_.stage})...</Text>}
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
      }}
      adapter={adapter}
      batchUpdates={batchUpdates}
      syncPayload={{
        authToken: TEST_TOKEN,
      }}
    >
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </LiveStoreProvider>
  );
}
