import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PengurusCard(props: any) {
  return (
    <View
      style={{
        backgroundColor: "#E5E7EB",
        marginBottom: 4,
        padding: 16,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Ionicons name="shield-half" size={32} color="#374151" />
        <View style={{ gap: 2 }}>
          <Text
            style={{
              color: "#374151",
              fontSize: 16,
              fontWeight: "600",
              textDecorationLine: "underline",
            }}
          >
            {props.name}
          </Text>
          <Text style={{ color: "#374151", fontSize: 14, fontWeight: "400" }}>
            {props.email}
          </Text>
          
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#d1d5db" />
    </View>
  );
}
