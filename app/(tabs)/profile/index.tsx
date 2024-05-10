import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";

export default function index() {
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Profile"
          desc="Lihat dan ubah informasi profil anda."
          headerHide={true}
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 14,
          }}
        >
          <Text>Home</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
