import { createContext, useEffect, useState } from "react";
import { nanoid } from "@livestore/livestore";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface User {
  id: string;
  name: string;
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
    setUser({
      id,
      name,
    });
    await AsyncStorage.setItem(
      "@user",
      JSON.stringify({
        id,
        name,
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
