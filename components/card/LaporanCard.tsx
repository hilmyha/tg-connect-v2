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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, width: 280 }}>
        <Ionicons name="document-text" size={42} color="#374151" />
        <View>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>{props.title}</Text>
          <Text>{props.isi}</Text>
          <Text>{props.kategori}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#d1d5db" />
    </View>
  );
}
