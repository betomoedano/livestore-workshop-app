import React from "react";
import { ListNotes } from "../components/ListNotes";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ListNotes />
    </View>
  );
}
