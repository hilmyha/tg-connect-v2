import React from "react";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, animation: "ios" }} />
      <Stack.Screen name="dokumenwarga" options={{ headerShown: false, animation: "ios" }} />
      {/* admin */}
      <Stack.Screen name="kelolapengurus" options={{ headerShown: false, animation: "ios" }} />
      <Stack.Screen name="rekap" options={{ headerShown: false, animation: "ios" }} />
      <Stack.Screen name="statusdokumen" options={{ headerShown: false, animation: "ios" }} />
    </Stack>
  );
}
