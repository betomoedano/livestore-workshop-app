import * as React from "react";
import { AuthContext } from "./Auth";
import { makePersistedAdapter } from "@livestore/adapter-expo";
import { makeCfSync } from "@livestore/sync-cf";
import {
  userEvents,
  userSchema,
  userTables,
} from "@workshop/shared/user-schema";
import { Store } from "@livestore/livestore";
import { useStore } from "@livestore/react";
import { LiveStoreProvider } from "@livestore/react";
import { UserStoreContext } from "./stores";
import { unstable_batchedUpdates as batchUpdates, Text } from "react-native";

const adapter = makePersistedAdapter({
  sync: {
    backend: makeCfSync({
      url: process.env.EXPO_PUBLIC_LIVESTORE_SYNC_URL!,
    }),
  },
});

export const LiveStoreUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = React.use(AuthContext);
  const user = auth?.user!; // if the user is not authenticated, user will be redirected to the auth page before this component is rendered

  const boot = React.useCallback(
    (store: Store) => {
      if (store.query(userTables.notes.count()) === 0) {
        store.commit(
          userEvents.userNoteCreated({
            title: `👋 Welcome ${user.name}!`,
          })
        );
      }
    },
    [user.id]
  );

  return (
    <LiveStoreProvider
      schema={userSchema}
      storeId={`user-${user.id}`}
      adapter={adapter}
      renderLoading={({ stage }) => <Text>Stage {stage}...</Text>}
      syncPayload={{ authToken: user.id, user: JSON.stringify(user) }}
      boot={boot}
      batchUpdates={batchUpdates}
    >
      <InsideUserStoreProvider>{children}</InsideUserStoreProvider>
    </LiveStoreProvider>
  );
};

function InsideUserStoreProvider({ children }: { children: React.ReactNode }) {
  const { store } = useStore();
  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  );
}
