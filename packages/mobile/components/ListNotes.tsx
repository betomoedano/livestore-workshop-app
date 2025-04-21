import { queryDb } from "@livestore/livestore";
import { useQuery } from "@livestore/react";
import React from "react";
import { FlatList } from "react-native";

import { tables } from "@workshop/shared/schema";
import { Note } from "./NoteItem.tsx";

const visibleNotes$ = queryDb(
  (get) => {
    return tables.note.where({
      deletedAt: null,
    });
  },
  { label: "visibleNotes" }
);

export const ListNotes: React.FC = () => {
  const visibleNotes = useQuery(visibleNotes$);

  return (
    <FlatList
      data={visibleNotes}
      renderItem={({ item }) => <Note {...item} />}
      keyExtractor={(item) => item.id.toString()}
      initialNumToRender={20}
      maxToRenderPerBatch={20}
    />
  );
};
