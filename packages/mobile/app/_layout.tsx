import "../polyfill.ts";
import React from "react";
import { Slot } from "expo-router";

import { AuthProvider } from "../context/Auth.tsx";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
