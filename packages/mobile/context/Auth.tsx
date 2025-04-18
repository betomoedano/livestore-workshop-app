import React, { createContext, ReactNode, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
  forceUnauthenticated?: boolean; // Flag to simulate unauthenticated state
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  forceUnauthenticated = false,
}) => {
  // Determine the user state based on the flag
  const [user, setUser] = useState<User | null>(null);

  return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
};

export const hardcodedUser1: User = {
  id: "1",
  name: "Beto",
  email: "beto@expo.io",
};

export const hardcodedUser2: User = {
  id: "2",
  name: "Keith",
  email: "keith@expo.io",
};
