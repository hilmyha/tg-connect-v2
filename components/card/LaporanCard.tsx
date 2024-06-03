import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function LaporanCard(props: any) {
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          width: 280,
        }}
      >
        {props.kategori === "usulan" ? (
          <Ionicons name="newspaper" size={30} color="#374151" />
        ) : (
          <Ionicons name="alert-circle" size={30} color="red" />
        )}
        <View>
          <Text
            style={{
              color: "#374151",
              fontSize: 18,
              fontWeight: "500",
              textDecorationLine: "underline",
              textTransform: "capitalize",
            }}
          >
            {props.title}
          </Text>
          <Text
            style={{
              color: "#6b7280",
              fontSize: 14,
              fontWeight: "400",
              marginTop: 6,
              textAlign: "justify",
              textTransform: "capitalize",
            }}
          >
            {props.kategori}
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
            {props.isi}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#d1d5db" />
    </View>
  );
}
