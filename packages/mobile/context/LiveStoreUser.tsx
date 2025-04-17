import React, { createContext, ReactNode, use, useContext } from "react";
import {
  LiveStoreProvider,
  ReactApi,
  LiveStoreContext,
} from "@livestore/react";
import { makePersistedAdapter } from "@livestore/adapter-expo";
import { makeCfSync } from "@livestore/sync-cf";
import {
  unstable_batchedUpdates as batchUpdates,
  Text,
  View,
  Button,
} from "react-native";
import type { Store } from "@livestore/livestore";

import {
  userSchema,
  userTables,
  userEvents,
} from "@workshop/shared/user-schema";
import { AuthContext } from "./Auth";
import { Redirect } from "expo-router";

const syncUrl = process.env.EXPO_PUBLIC_LIVESTORE_SYNC_URL;

interface UserStoreContextType {
  store: Store & ReactApi;
}

export const UserStoreContext = createContext<UserStoreContextType | undefined>(
  undefined
);

interface LiveStoreUserProviderProps {
  children: ReactNode;
}

const adapter = makePersistedAdapter({
  sync: { backend: makeCfSync({ url: syncUrl }) },
});

export const LiveStoreUserProvider: React.FC<LiveStoreUserProviderProps> = ({
  children,
}) => {
  const user = use(AuthContext)?.user;
  const [, rerender] = React.useState({});

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  const storeId = `user-${user.id}`;
  const syncPayload = { authToken: user.id, user: JSON.stringify(user) };

  const bootFn = (store: Store) => {
    if (store.query(userTables.notes.count()) === 0) {
      store.commit(
        userEvents.noteCreated({
          ownerId: user.id,
          title: `👋 Welcome ${user.name}!`,
          content:
            "This is your personal notes app. Create a note to get started.",
        })
      );
    }
  };

  return (
    <LiveStoreProvider
      schema={userSchema}
      storeId={storeId}
      adapter={adapter}
      syncPayload={syncPayload}
      batchUpdates={batchUpdates}
      renderLoading={(stageInfo) => (
        <Text>Loading User LiveStore ({stageInfo.stage})...</Text>
      )}
      renderError={(error: any) => (
        <Text>User LiveStore Error: {error.toString()}</Text>
      )}
      renderShutdown={() => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>User LiveStore Shutdown</Text>
          <Button title="Reload" onPress={() => rerender({})} />
        </View>
      )}
      boot={bootFn}
    >
      <StoreContextInitializer>{children}</StoreContextInitializer>
    </LiveStoreProvider>
  );
};

const StoreContextInitializer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const baseStoreContext = useContext(LiveStoreContext);

  if (!baseStoreContext || baseStoreContext.stage !== "running") {
    return null;
  }

  const store = baseStoreContext.store;

  return (
    <UserStoreContext.Provider value={{ store: store }}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = (): UserStoreContextType => {
  const context = useContext(UserStoreContext);
  if (context === undefined) {
    throw new Error("useUserStore must be used within a LiveStoreUserProvider");
  }
  return context;
};
