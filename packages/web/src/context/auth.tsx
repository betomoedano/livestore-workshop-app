import React, { createContext, useState, useEffect } from "react";
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
  signOut: () => void;
}>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // If we're on the login page, redirect to home
        if (window.location.pathname === "/login") {
          router.navigate({ to: "/" });
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, [router]);

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

    // The useEffect in Login component will handle navigation
  }

  function signOut() {
    // Clear user data
    setUser(null);
    localStorage.removeItem("user");

    // Force a hard navigation to the login page to ensure clean state
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
