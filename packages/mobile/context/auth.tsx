import { createContext, useEffect, useState } from "react";
import { nanoid } from "@livestore/livestore";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT, { SupportedAlgorithms } from "expo-jwt";

const JWT_SECRET = "a-string-secret-at-least-256-bits-long";
interface User {
  id: string;
  name: string;
  jwt: string;
}

export const AuthContext = createContext<{
  user: User | null;
  signIn: (name: string) => void;
  signOut: () => void;
}>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    restoreSession();
  }, []);

  async function signIn(name: string) {
    if (!name) {
      Alert.alert(
        "Oops!",
        "Please enter your name so we know who's joining the party! 🎉"
      );
      return;
    }
    const id = nanoid();
    const payload = {
      sub: id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
      name,
    };
    const jwt = JWT.encode(payload, JWT_SECRET, {
      algorithm: SupportedAlgorithms.HS256,
    });

    setUser({
      id,
      name,
      jwt,
    });

    await AsyncStorage.setItem(
      "@user",
      JSON.stringify({
        id,
        name,
        jwt,
      })
    );
    console.log("Signing in", user);
    router.replace("/(home)");
  }

  async function signOut() {
    await AsyncStorage.removeItem("@user");
    setUser(null);
    router.replace("/(auth)");
  }

  async function restoreSession() {
    const user = await AsyncStorage.getItem("@user");
    if (user) {
      console.log("Restoring session", user);
      setUser(JSON.parse(user));
    } else {
      console.log("No session found");
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
