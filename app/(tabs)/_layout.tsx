import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Tabs } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#4E6E81",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="laporan"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#4E6E81",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="file-tray-full" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="informasi"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#4E6E81",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="document-text" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#4E6E81",
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}
