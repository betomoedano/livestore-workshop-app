import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ReactionScreen() {
  const { reaction } = useLocalSearchParams();

  return (
    <View>
      <Text>{reaction}</Text>
    </View>
  );
}
