import { makeSchema, Schema, State } from "@livestore/livestore";
import * as noteEventsDefs from "./note-events";

const note = State.SQLite.table({
  name: "note",
  columns: {
    id: State.SQLite.text({ primaryKey: true }),
    title: State.SQLite.text({ default: "" }),
    content: State.SQLite.text({ default: "" }),
    createdAt: State.SQLite.integer({ schema: Schema.DateFromNumber }),
    updatedAt: State.SQLite.integer({ schema: Schema.DateFromNumber }),
    deletedAt: State.SQLite.integer({
      nullable: true,
      schema: Schema.DateFromNumber,
    }),
  },
});

// Materialize events into tables
const noteMaterializers = State.SQLite.materializers(noteEventsDefs, {
  "v1.NoteCreated": ({ id, title, content, createdAt }) =>
    note.insert({ id, title, content, createdAt, updatedAt: createdAt }),

  "v1.NoteUpdated": ({ id, title, content, updatedAt }) =>
    note.update({ title, content, updatedAt }).where({ id }),

  "v1.NoteDeleted": ({ id, deletedAt }) =>
    note.update({ deletedAt }).where({ id }),
});

// Build state and schema
const noteState = State.SQLite.makeState({
  tables: { note },
  materializers: noteMaterializers,
});

export const noteEvents = {
  ...noteEventsDefs,
};

export const noteSchema = makeSchema({ events: noteEvents, state: noteState });
export const noteTables = { note };
