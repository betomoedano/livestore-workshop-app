import { Events, Schema } from "@livestore/livestore";

export const userNoteCreated = Events.synced({
  name: "v1.UserNoteCreated",
  schema: Schema.Struct({
    title: Schema.String,
  }),
});

export const userNoteDeleted = Events.synced({
  name: "v1.UserNoteDeleted",
  schema: Schema.Struct({
    id: Schema.String,
    deletedAt: Schema.DateFromNumber,
  }),
});
