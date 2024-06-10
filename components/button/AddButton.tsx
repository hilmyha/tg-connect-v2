import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  keterangan: string;
  onPress: () => void;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4E6E81",
    borderRadius: 30,
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  bacdropHover: {
    backgroundColor: "#405B6A",
    borderRadius: 30,
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notifier: {
    backgroundColor: "#ffff",
    borderRadius: 30,
    // width: 140,
    height: 35,
    position: "absolute",
    bottom: 26,
    right: 16,
    // zIndex: 5,
    alignItems: "flex-start",
    paddingLeft: 16,
    paddingRight: 64,
    justifyContent: "center",
  },
});

export default function AddButton(props: Props) {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
      <View style={styles.bacdropHover} />
      {/* buatkan background untuk keterangan */}
      <View style={styles.notifier}>
        <Text style={{ color: "#4E6E81", fontSize: 12, fontWeight: "bold" }}>
          {props.keterangan}
        </Text>
      </View>
    </View>
  );
}
