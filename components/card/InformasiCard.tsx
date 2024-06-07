import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function InformationCard(props: any) {
  return (
    <View style={{ backgroundColor: "#E5E7EB", padding: 16, borderRadius: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Ionicons name="newspaper" size={18} color="#374151" />
        <Text
          style={{
            color: "#374151",
            fontSize: 18,
            fontWeight: "500",
            textDecorationLine: "underline",
          }}
        >
          {props.title}
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
        Pada {props.date} | Pukul {props.time}
      </Text>
      <Text
        style={{
          color: "#374151",
          fontSize: 16,
          fontWeight: "500",
          marginTop: 4,
          textAlign: "justify",
        }}
      >
        {props.desc}
      </Text>
    </View>
  );
}
