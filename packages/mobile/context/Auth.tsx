import React, { createContext, ReactNode, use } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
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
  const user = forceUnauthenticated ? null : hardcodedUser;

  return <AuthContext value={{ user }}>{children}</AuthContext>;
};

const hardcodedUser: User = {
  id: "1",
  name: "Beto",
  email: "beto@expo.io",
};
