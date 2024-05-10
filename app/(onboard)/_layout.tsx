import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="daftar"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
