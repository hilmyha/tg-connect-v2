import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  icon: string;
  onPress: () => void;
};

export default function LogoutButton(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{ padding: 8, backgroundColor: "#fecaca", borderRadius: 24 }}
          >
            <Ionicons name={props.icon} size={24} color="#f87171" />
          </View>
          <Text style={{ color: "#ef4444" }}>{props.title}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="chevron-forward" size={24} color="#d1d5db" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
