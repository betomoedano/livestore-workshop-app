import React from "react";
import { ListNotes } from "../components/ListNotes";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
      <ListNotes />
    </View>
  );
}
