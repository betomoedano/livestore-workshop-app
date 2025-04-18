import { Text, View, Button } from "react-native";
import {
  AuthContext,
  hardcodedUser1,
  hardcodedUser2,
} from "../../context/Auth";
import { use } from "react";

export default function AuthIndex() {
  const auth = use(AuthContext);
  if (!auth) {
    return <Text>No auth context found</Text>;
  }
  const { user, setUser } = auth;

  return (
    <View>
      <Text>Auth Index</Text>
      <Button title="Login as Beto" onPress={() => setUser(hardcodedUser1)} />
      <Button title="Login as Keith" onPress={() => setUser(hardcodedUser2)} />
    </View>
  );
}
