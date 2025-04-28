import { use } from "react";
import { View, Pressable, Text } from "react-native";
import { ListNotes } from "../../components/ListNotes";
import { AuthContext } from "../../context/auth";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const { signOut } = use(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <ListNotes />
      <Pressable
        onPress={signOut}
        style={{
          position: "absolute",
          bottom: 32,
          left: 16,
          width: 50,
          height: 50,
          backgroundColor: "#000",
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="log-out-outline" size={24} color="white" />
      </Pressable>
    </View>
  );
}
