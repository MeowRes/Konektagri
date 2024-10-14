import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

const RootLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
