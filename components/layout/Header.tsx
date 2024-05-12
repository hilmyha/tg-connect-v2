import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

function HeaderIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return (
    <Ionicons
      size={32}
      style={{ marginBottom: -3, borderWidth: 1 }}
      {...props}
    />
  );
}

export default function Header(props: {
  title: string;
  desc: string;
  headerHide?: boolean;
}) {
  return (
    <View
      style={{
        paddingTop: 100,
        paddingHorizontal: 16,
        paddingBottom: 22,
        backgroundColor: "#4E6E81",
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {props.headerHide ? (
          <View style={{ borderWidth: 1, padding: 16 }}></View>
        ) : (
          <Pressable onPress={() => router.back()}>
            <HeaderIcon name="arrow-back" color="white" />
          </Pressable>
        )}

        <Text
          style={{
            fontSize: 28,
            fontWeight: "900",
            color: "white",
          }}
        >
          {props.title}
        </Text>
        <View style={{ borderWidth: 1, padding: 16 }}></View>
      </View>

      <View
        style={{ flex: 1, width: "100%", alignItems: "center", marginTop: 8 }}
      >
        <Text style={{ color: "white", fontSize: 14 }}>{props.desc}</Text>
      </View>
    </View>
  );
}
