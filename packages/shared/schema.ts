import { DbSchema, makeSchema } from "@livestore/livestore";

import { Filter } from "./types.ts";
import * as mutations from "./mutations.ts";

const todos = DbSchema.table(
  "todos",
  {
    id: DbSchema.text({ primaryKey: true }),
    text: DbSchema.text({ default: "" }),
    completed: DbSchema.boolean({ default: false }),
    deleted: DbSchema.integer({ nullable: true }),
  },
  { deriveMutations: true }
);

const app = DbSchema.table(
  "app",
  {
    newTodoText: DbSchema.text({ default: "" }),
    filter: DbSchema.text({ schema: Filter, default: "all" }),
  },
  { isSingleton: true, deriveMutations: true }
);

export type Todo = DbSchema.FromTable.RowDecoded<typeof todos>;
export type AppState = DbSchema.FromTable.RowDecoded<typeof app>;

export const tables = { todos, app };

export const schema = makeSchema({
  tables,
  mutations,
  migrations: { strategy: "from-mutation-log" },
});

export * as mutations from "./mutations.ts";
