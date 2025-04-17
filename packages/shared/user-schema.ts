import {
  makeSchema,
  nanoid,
  Schema,
  SessionIdSymbol,
  State,
} from "@livestore/livestore";

// Import AccessLevel type
import { AccessLevel } from "./types.ts";
import * as userEventsDefs from "./user-events.ts";

const notes = State.SQLite.table({
  name: "notes",
  columns: {
    id: State.SQLite.text({ primaryKey: true }),
    ownerId: State.SQLite.text({ default: "" }),
    accessLevel: State.SQLite.text({
      schema: AccessLevel,
      default: "viewer",
    }),
    title: State.SQLite.text({ default: "Untitled" }),
    content: State.SQLite.text({ default: "" }),
    createdBy: State.SQLite.text({ default: "" }),
    createdAt: State.SQLite.integer({
      schema: Schema.DateFromNumber,
    }),
    updatedAt: State.SQLite.integer({
      schema: Schema.DateFromNumber,
    }),
    deletedAt: State.SQLite.integer({
      nullable: true,
      schema: Schema.DateFromNumber,
    }),
  },
});

const userUiState = State.SQLite.clientDocument({
  name: "uiState",
  schema: Schema.Struct({ searchTerm: Schema.String }),
  default: {
    id: SessionIdSymbol,
    value: { searchTerm: "" },
  },
});

export type Note = State.SQLite.FromTable.RowDecoded<typeof notes>;
export type UserUiState = typeof userUiState.default.value;

// Add new user events to the events export
export const userEvents = {
  ...userEventsDefs, // Added Note* events
  uiStateSet: userUiState.set,
};

export const userTables = { notes, uiState: userUiState };

// Define materializers for the new Note events
const userMaterializers = State.SQLite.materializers(userEvents, {
  "v1.NoteCreated": ({ ownerId, title, content }) =>
    notes.insert({
      id: nanoid(),
      ownerId,
      accessLevel: "owner",
      title,
      content,
      createdBy: ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  "v1.NoteUpdated": ({ id, title, content, updatedAt }) =>
    notes.update({ title, content, updatedAt }).where({ id }),
  "v1.NoteDeleted": ({ id, deletedAt }) =>
    notes.update({ deletedAt }).where({ id }),
});

// Update state definition to include the new materializers
const userState = State.SQLite.makeState({
  tables: userTables,
  materializers: userMaterializers,
});

export const userSchema = makeSchema({ events: userEvents, state: userState });
