import { View, Text, StyleSheet, Pressable } from "react-native";

export const NoteReactions = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.reactionButton}>
        <Text>👍</Text>
      </Pressable>
      <Pressable style={styles.reactionButton}>
        <Text>❤️</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  reactionButton: {
    padding: 10,
  },
});
