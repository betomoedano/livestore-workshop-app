import { MaterialIcons } from "@expo/vector-icons";
import { useStore } from "@livestore/react";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { Note as INote } from "@workshop/shared/schema";
import { events } from "@workshop/shared/schema";

export const Note: React.FC<INote> = ({ id, title, content, createdBy }) => {
  const { store } = useStore();

  const handleDeleteNote = () =>
    store.commit(events.noteDeleted({ id, deletedAt: new Date() }));

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text selectable style={styles.text}>
            {title}
          </Text>
        </View>
        <TouchableOpacity onPress={handleDeleteNote}>
          <MaterialIcons
            name="delete-outline"
            size={24}
            color="#73737340"
            style={styles.delete}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#737373",
  },
  time: {
    fontSize: 13,
    color: "#a3a3a3",
    fontWeight: "500",
  },
  delete: {
    marginRight: 10,
  },
});
