import { queryDb } from "@livestore/livestore";

import { tables } from "./schema.ts";

export const app$ = queryDb(tables.uiState.get(), { label: "app" });

export const visibleNotes$ = queryDb(
  (get) => {
    return tables.note.where({
      deletedAt: null,
    });
  },
  { label: "visibleNotes" }
);
