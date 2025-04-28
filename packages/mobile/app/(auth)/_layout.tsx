import { Redirect, Stack } from "expo-router";
import { AuthContext } from "../../context/auth";
import { use } from "react";

export default function AuthLayout() {
  const { user } = use(AuthContext);

  if (user) {
    return <Redirect href="/(home)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
