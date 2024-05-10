import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="register"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
