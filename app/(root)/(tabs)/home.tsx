import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center text-blue-600">
      <Text className="text-2xl">Home</Text>
    </SafeAreaView>
  );
}
