import React, { createContext, useState } from "react";
import { nanoid } from "@livestore/livestore";
import { useRouter } from "@tanstack/react-router";

interface User {
  id: string;
  name: string;
}

// eslint-disable-next-line react-refresh/only-export-components
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
      alert("Please enter your name so we know who's joining the party! 🎉");
      return;
    }
    setUser({
      id: nanoid(),
      name,
    });
    router.navigate({ to: "/" });
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
