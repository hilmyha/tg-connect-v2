import { View, Text, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default function PanicCard(props: any) {
  return (
    <View
      style={{
        backgroundColor: "#F87171",
        borderRadius: 16,
        borderWidth: 4,
        borderColor: "#EF4444",
      }}
    >
      <View
        style={{
          backgroundColor: "#EF4444",
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View
          style={{
            backgroundColor: "#F87171",
            paddingHorizontal: 16,
            paddingVertical: 2,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "500" }}>
            #{props.id}
          </Text>
        </View>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
          Panic Button Triggered
        </Text>
      </View>
      <View style={{ padding: 16 }}>

        <Text style={styles.text}>Kejadian pada {props.time}</Text>
        <Text style={styles.text}>
          {props.latitude} | {props.longitude}
        </Text>
      </View>
    </View>
  );
}
