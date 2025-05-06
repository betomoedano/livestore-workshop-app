import "../../polyfill.ts";
import React, { use } from "react";
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
} from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { events, schema, tables } from "@workshop/shared/schema";
import { makeCfSync } from "@livestore/sync-cf";
import { AuthContext } from "../../context/auth.tsx";
import { loadEnvironment } from "../../utils/load-environment.ts";

// Hardcoded token for testing - valid for 24 hours
const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvIiwiaWF0IjoxNzEzMjQ5NjAwLCJleHAiOjE3MTMzMzYwMDB9.4Adcj3UFYcPpxga7Cp6AnuRwhk9xU3j3ZbXBp7fYH7E";

const adapter = makePersistedAdapter({
  sync: { backend: makeCfSync({ url: loadEnvironment() }) },
});

const EXPO_CLUB_STORE_ID = "expo-club";

export default function RootLayout() {
  const { user } = use(AuthContext);
  const [, rerender] = React.useState({});
  const router = useRouter();
  const [syncWithWorkshop, setSyncWithWorkshop] = React.useState(false);

  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <LiveStoreProvider
      schema={schema}
      storeId={syncWithWorkshop ? EXPO_CLUB_STORE_ID : user.id}
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
        if (syncWithWorkshop) return;

        if (store.query(tables.note.count()) === 0) {
          store.commit(
            events.noteCreated({
              id: nanoid(),
              title: "My first note",
              content: "Hello, world!",
              createdBy: user.name,
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
            title: `Welcome, ${user.name}`,
            headerStyle: {
              backgroundColor: "#F2F2F7",
            },
            headerShadowVisible: false,
            headerLeft: () => {
              return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Switch
                    value={syncWithWorkshop}
                    onValueChange={() => setSyncWithWorkshop(!syncWithWorkshop)}
                  />
                </View>
              );
            },
            headerRight: ({ tintColor }) => {
              const { store } = useStore();
              return (
                <Pressable
                  onPress={() => {
                    const id = nanoid();
                    store.commit(
                      events.noteCreated({
                        id,
                        title: "",
                        content: "",
                        createdBy: user.name,
                      })
                    );
                    router.push({
                      pathname: "/[note]",
                      params: { note: id },
                    });
                  }}
                >
                  <Ionicons
                    name="add"
                    size={30}
                    color={tintColor}
                    style={{ marginRight: 10 }}
                  />
                </Pressable>
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
            sheetAllowedDetents: [0.3, 0.7],
            headerShown: false,
            sheetGrabberVisible: true,
          }}
        />
      </Stack>
    </LiveStoreProvider>
  );
}
