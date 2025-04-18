import { Redirect, Stack } from "expo-router";
import { use } from "react";
import { AuthContext } from "../../context/Auth";

export default function AuthLayout() {
  const auth = use(AuthContext);

  if (auth?.user?.id) {
    console.log("user is authenticated, redirecting to app");
    return <Redirect href="/(app)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sign In" }} />
    </Stack>
  );
}
