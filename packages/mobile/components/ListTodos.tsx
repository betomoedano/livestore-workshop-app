import { queryDb } from "@livestore/livestore";
import { useQuery } from "@livestore/react";
import React from "react";
import { FlatList } from "react-native";

import { app$ } from "@workshop/shared/queries";
import { tables } from "@workshop/shared/schema";
import { Todo } from "./Todo.tsx";
import { useUserStore } from "../context/LiveStoreUser.tsx";
import { userTables } from "@workshop/shared/user-schema.ts";

const visibleTodos$ = queryDb(
  (get) => {
    const { filter } = get(app$);
    return tables.todos.where({
      deletedAt: null,
      completed: filter === "all" ? undefined : filter === "completed",
    });
  },
  { label: "visibleTodos" }
);

export const ListTodos: React.FC = () => {
  const visibleTodos = useQuery(visibleTodos$);
  const { store } = useUserStore();

  console.log(store.query(userTables.notes.count()));

  return (
    <FlatList
      data={visibleTodos}
      renderItem={({ item }) => <Todo {...item} />}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={20}
      maxToRenderPerBatch={20}
    />
  );
};
