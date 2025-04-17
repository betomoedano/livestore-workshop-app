import { Schema } from "@livestore/livestore";

export const Filter = Schema.Literal("all", "active", "completed");
export type Filter = typeof Filter.Type;

// Define access levels for notes
export const AccessLevel = Schema.Literal("owner", "editor", "viewer");
export type AccessLevel = typeof AccessLevel.Type;
