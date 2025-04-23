import React, { createContext, useEffect, useState } from "react";
import { nanoid } from "@livestore/livestore";

interface User {
  id: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  signIn: (name: string) => void;
  signOut: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthState>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  function signIn(name: string) {
    if (!name) {
      alert("Please enter your name so we know who's joining the party! 🎉");
      return;
    }

    const newUser = {
      id: nanoid(),
      name,
    };
    // Save to state and localStorage
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  function signOut() {
    // Clear user data
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
