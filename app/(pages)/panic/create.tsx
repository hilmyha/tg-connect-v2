import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Location from "expo-location";
import { createPanic } from "../../../services/PanicService";

export default function create() {
  const [location, setLocation] = useState<any>(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Set latitude and longitude state
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
    })();
  }, []);

  const handlePanic = () => {
    Alert.alert(
      "Konfirmasi",
      "Apakah anda yakin ingin melaporkan keadaan darurat?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Ya",
          onPress: async () => {
            // send location to server
            console.log(location);

            try {
              await createPanic({
                latitude,
                longitude,
              });

              console.log("Panic created");
              router.push("/(pages)/panic/");
            } catch (error) {
              console.error("Error creating panic", error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#dc2626" />
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 48,
          paddingBottom: 24,
          backgroundColor: "#ef4444",
          flex: 1,
          gap: 14,
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
        }}
      >
        <View
          style={{
            position: "absolute",
            paddingVertical: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
            top: 32,
            width: "100%",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={32} color="white" />
          </Pressable>
          <Pressable onPress={() => console.log("pressed")}>
            <Ionicons name="help-circle" size={32} color="white" />
          </Pressable>
        </View>
        <TouchableOpacity
          style={{
            padding: 32,
            borderRadius: 46,
            backgroundColor: "#f87171",
            elevation: 5,
          }}
          onPress={handlePanic}
        >
          <View
            style={{
              padding: 32,
              borderRadius: 32,
              backgroundColor: "#fca5a5",
            }}
          >
            <Ionicons name="alert-circle" size={54} color="#fecaca" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            padding: 12,
            bottom: 12,
          }}
          onPress={() => router.push("/(pages)/panic/")}
        >
          <Text style={{ color: "white", textDecorationLine: "underline" }}>
            Lihat laporan darurat
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
