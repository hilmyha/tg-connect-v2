import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  Animated,
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
  const [pressStartTime, setPressStartTime] = useState(0);
  const [durationText, setDurationText] = useState("");
  const [panicSent, setPanicSent] = useState(false);

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

  useEffect(() => {
    let timer: any;
    if (pressStartTime) {
      let countdown = 1;
      timer = setInterval(() => {
        if (countdown <= 3) {
          setDurationText(`${countdown} detik`);
          countdown++;
        } else {
          clearInterval(timer);
          setDurationText("");
          if (!panicSent) {
            sendPanic();
          }
        }
      }, 1000);
    } else {
      setDurationText("");
    }

    return () => clearInterval(timer);
  }, [pressStartTime, panicSent]);

  const handlePressIn = () => {
    setPressStartTime(Date.now());
    setPanicSent(false);
  };

  const handlePressOut = () => {
    setDurationText("");
    if (pressStartTime) {
      const pressDuration = Math.ceil((Date.now() - pressStartTime) / 1000);
      if (pressDuration >= 3) {
        if (!panicSent) {
          sendPanic();
        }
      } else {
        Alert.alert(
          "Peringatan",
          "Tahan tombol selama 3 detik untuk mengirim data."
        );
      }
    }
    setPressStartTime(0);
  };

  const sendPanic = async () => {
    try {
      await createPanic({
        latitude,
        longitude,
      });

      console.log("Panic created");
      router.push("/(pages)/panic/");
      setPanicSent(true);
    } catch (error) {
      console.error("Error creating panic", error);
    }
  };

  const handleHelp = () => {
    Alert.alert(
      "Bantuan",
      "Tekan tombol merah untuk melaporkan keadaan darurat. Pastikan anda dalam keadaan aman dan segera hubungi pihak berwajib. Terima kasih.",
      [
        {
          text: "Tutup",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
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
          <Pressable onPress={handleHelp}>
            <Ionicons name="help-circle" size={32} color="white" />
          </Pressable>
        </View>

        <Text style={{ color: "#ffffff", marginTop: 10 }}>{durationText}</Text>
        <TouchableOpacity
          style={{
            padding: 32,
            borderRadius: 46,
            backgroundColor: "#f87171",
            elevation: 5,
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
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
