import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function MenuCard(props: any) {
  return (
    <Link href={props.link} asChild>
      <Pressable onPress={() => console.log("Pressed")}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: props.bgcolor,
              width: 110,
              height: 72,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
              marginBottom: 8,
            }}
          >
            <Ionicons name={props.icoName} size={32} color={props.icoColor} />
          </View>
          <Text style={{ color: "#3A5261" }}>{props.title}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
