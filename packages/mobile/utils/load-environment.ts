import { Platform } from "react-native";

/**
 * Loads the correct base URL for the environment
 * @returns The base URL for the environment
 */
export function loadEnvironment() {
  const env = process.env.EXPO_PUBLIC_LIVESTORE_SYNC_URL;

  if (!env) {
    throw new Error(
      "EXPO_PUBLIC_LIVESTORE_SYNC_URL is not set, make sure to set it in your .env.local file"
    );
  }

  if (env.startsWith("ws://")) {
    return Platform.select({
      default: env,
      android: env.replace("localhost", "10.0.2.2"),
    });
  }

  console.log("env", env);
  return env;
}
