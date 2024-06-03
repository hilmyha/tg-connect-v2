import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function AdminCard(props: any) {
  return (
    <View style={{ backgroundColor: "#E5E7EB", padding: 16, borderRadius: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Text
          style={{
            color: "#374151",
            fontSize: 18,
            fontWeight: "500",
            textDecorationLine: "underline",
            textTransform: "capitalize",
          }}
        >
          {props.name}
        </Text>
      </View>
      <Text
        style={{
          color: "#6b7280",
          fontSize: 14,
          fontWeight: "400",
          marginTop: 6,
          textAlign: "justify",
        }}
      >
        {props.email}
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
      >
        <Ionicons name="at-circle" size={18} color="#374151" />
        <Text
          style={{
            color: "#374151",
            fontSize: 16,
            fontWeight: "500",
            marginLeft: 6,
            textAlign: "justify",
          }}
        >
          {props.is_admin}
        </Text>
      </View>
    </View>
  );
}
