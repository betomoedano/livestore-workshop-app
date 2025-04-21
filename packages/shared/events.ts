import { Events, Schema } from "@livestore/livestore";

export const todoCreated = Events.synced({
  name: "v1.TodoCreated",
  schema: Schema.Struct({ id: Schema.String, text: Schema.String }),
});

export const todoCompleted = Events.synced({
  name: "v1.TodoCompleted",
  schema: Schema.Struct({ id: Schema.String }),
});

export const todoUncompleted = Events.synced({
  name: "v1.TodoUncompleted",
  schema: Schema.Struct({ id: Schema.String }),
});

export const todoDeleted = Events.synced({
  name: "v1.TodoDeleted",
  schema: Schema.Struct({ id: Schema.String, deletedAt: Schema.Date }),
});

export const todoClearedCompleted = Events.synced({
  name: "v1.TodoClearedCompleted",
  schema: Schema.Struct({ deletedAt: Schema.Date }),
});

export const todoEditingStarted = Events.synced({
  name: "v1.TodoEditingStarted",
  schema: Schema.Struct({ id: Schema.String }),
});

export const todoEditingFinished = Events.synced({
  name: "v1.TodoEditingFinished",
  schema: Schema.Struct({ id: Schema.String, text: Schema.String }),
});

export const noteCreated = Events.synced({
  name: "v1.NoteCreated",
  schema: Schema.Struct({
    id: Schema.String,
    content: Schema.String,
    createdBy: Schema.String,
  }),
});

export const noteUpdated = Events.synced({
  name: "v1.NoteUpdated",
  schema: Schema.Struct({ id: Schema.String, content: Schema.String }),
});

export const noteReacted = Events.synced({
  name: "v1.NoteReacted",
  schema: Schema.Struct({
    id: Schema.String,
    noteId: Schema.String,
    emoji: Schema.String,
    type: Schema.String,
    createdBy: Schema.String,
  }),
});

export const noteDeleted = Events.synced({
  name: "v1.NoteDeleted",
  schema: Schema.Struct({ id: Schema.String, deletedAt: Schema.Date }),
});

export const noteReactionDeleted = Events.synced({
  name: "v1.NoteReactionDeleted",
  schema: Schema.Struct({ id: Schema.String, deletedAt: Schema.Date }),
});

export const noteReactionCreated = Events.synced({
  name: "v1.NoteReactionCreated",
  schema: Schema.Struct({
    id: Schema.String,
    noteId: Schema.String,
    emoji: Schema.String,
    type: Schema.String,
    createdBy: Schema.String,
  }),
});
