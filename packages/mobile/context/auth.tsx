import { createContext, useState } from "react";
import { nanoid } from "@livestore/livestore";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

interface User {
  id: string;
  name: string;
}

export const AuthContext = createContext<{
  user: User | null;
  signIn: (name: string) => void;
}>({
  user: null,
  signIn: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  function signIn(name: string) {
    if (!name) {
      Alert.alert(
        "Oops!",
        "Please enter your name so we know who's joining the party! 🎉"
      );
      return;
    }
    setUser({
      id: nanoid(),
      name,
    });
    router.replace("/(home)");
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
