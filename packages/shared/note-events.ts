import { Events, Schema } from "@livestore/livestore";

// Per-note events for a single-note LiveStore
export const noteCreated = Events.synced({
  name: "v1.NoteCreated",
  schema: Schema.Struct({
    id: Schema.String,
    title: Schema.String,
    content: Schema.String,
    createdAt: Schema.DateFromNumber,
  }),
});

export const noteUpdated = Events.synced({
  name: "v1.NoteUpdated",
  schema: Schema.Struct({
    id: Schema.String,
    title: Schema.String,
    content: Schema.String,
    updatedAt: Schema.DateFromNumber,
  }),
});

export const noteDeleted = Events.synced({
  name: "v1.NoteDeleted",
  schema: Schema.Struct({
    id: Schema.String,
    deletedAt: Schema.DateFromNumber,
  }),
});
