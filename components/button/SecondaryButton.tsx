import { View, Text, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type Props = {
  title: string;
  onPress: () => void;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4E6E81",
    padding: 16,
    borderRadius: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "semibold",
    fontSize: 16,
  }
});

export default function PrimaryButton(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <Text
          style={styles.text}
          // style={{ fontFamily: "Rubik_500Medium" }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
