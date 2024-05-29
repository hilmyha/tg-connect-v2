import React from "react";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, animation: "ios" }} />
      <Stack.Screen name="detail" options={{ headerShown: false, animation: "ios" }} />
    </Stack>
  );
}
