import { createContext, useContext } from "react";
import type { Store } from "@livestore/livestore";

export const UserStoreContext = createContext<Store | null>(null);
export const NoteStoreContext = createContext<Store | null>(null);

export function useUserStore(): Store {
  const ctx = useContext(UserStoreContext);
  if (!ctx)
    throw new Error("useUserStore must be inside LiveStoreUserProvider");
  return ctx;
}

export function useNoteStore(): Store {
  const ctx = useContext(NoteStoreContext);
  if (!ctx)
    throw new Error("useNoteStore must be inside LiveStoreNoteProvider");
  return ctx;
}
