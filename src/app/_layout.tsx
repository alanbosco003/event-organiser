import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { EventFormProvider } from "../context/EventFormContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <EventFormProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
      </EventFormProvider>
    </SafeAreaProvider>
  );
}
