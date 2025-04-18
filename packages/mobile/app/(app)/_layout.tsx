import { Redirect, Stack } from "expo-router";
import { LiveStoreUserProvider } from "../../context/LiveStoreUserProvider.tsx";
import { use } from "react";
import { AuthContext } from "../../context/Auth.tsx";

export default function AppLayout() {
  // const auth = use(AuthContext);

  const auth = use(AuthContext);

  if (!auth?.user?.id) {
    console.log("no auth, redirecting to auth");
    return <Redirect href="/(auth)" />;
  }

  return (
    <LiveStoreUserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </LiveStoreUserProvider>
  );
}
