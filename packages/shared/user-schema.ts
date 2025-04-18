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
    title: State.SQLite.text({ default: "Untitled" }),
    accessLevel: State.SQLite.text({
      schema: AccessLevel,
      default: "viewer",
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
  "v1.UserNoteCreated": ({ title }) =>
    notes.insert({
      id: nanoid(),
      accessLevel: "owner",
      title,
    }),
  "v1.UserNoteDeleted": ({ id }) =>
    notes.update({ deletedAt: new Date() }).where({ id }),
});

// Update state definition to include the new materializers
const userState = State.SQLite.makeState({
  tables: userTables,
  materializers: userMaterializers,
});

export const userSchema = makeSchema({ events: userEvents, state: userState });
