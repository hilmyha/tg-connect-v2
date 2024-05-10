import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { router } from "expo-router";
import { Image } from "expo-image";

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 260,
  },
});

export default function index() {
  const handlePress = () => {
    router.replace("daftar");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 16, justifyContent: "center", gap: 24 }}
    >
      <View>
        <Image
          style={styles.image}
          source={require("../../../assets/welcome.svg")}
          contentFit="fill"
          transition={500}
        />
        <Text style={{ fontWeight: "900", fontSize: 34, color: "#405B6A" }}>
          TG Connect,
        </Text>
        <Text>
          Dirancang untuk mengamankan data penduduk RT 09 Perumahan Taman
          Gading, Cilacap
        </Text>
      </View>
      <View>
        <PrimaryButton title="Mulai" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
}
