import { queryDb } from "@livestore/livestore";

import { tables } from "./schema.ts";

export const app$ = queryDb(tables.uiState.get(), { label: "app" });

export const visibleNotes$ = queryDb(
  tables.note
    .where({
      deletedAt: null,
    })
    .orderBy("createdAt", "desc"),
  { label: "visibleNotes" }
);

export const noteReactions$ = (noteId: string, type: "regular" | "super") =>
  queryDb(
    tables.reaction.where({
      noteId,
      type,
    }),
    { label: `reactions-${noteId}-${type}` }
  );
