import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import Header from "../../../../components/layout/Header";
import { createDokumenWarga } from "../../../../services/DokumenWargaService";
import { router } from "expo-router";
import { Image } from "expo-image";
import PrimaryButton from "../../../../components/button/PrimaryButton";

export default function index() {
  const [dokumen, setDokumen] = useState("");
  const [keterangan, setKeterangan] = useState(false);

  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    // set image dari hasil pick image
    if (!result.canceled) {
      setDokumen(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect 16:9
      aspect: [16, 9],
      quality: 1,
    });

    // set image dari hasil pick image
    if (!result.canceled) {
      setDokumen(result.assets[0].uri);
    }
  };

  const handleDokumen = async () => {
    try {
      if (!dokumen) {
        setError(["Semua kolom harus diisi"]);
        return;
      } else {
        setError([]);
      }

      console.log(dokumen, keterangan);
      await createDokumenWarga({
        dokumen: dokumen,
        keterangan,
      });

      router.push("(tabs)/profile");
    } catch (error: any) {
      // carikan errornya dimana
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    image: {
      width: 300,
      height: 200,
    },
    picker: {
      backgroundColor: "white",
      borderRadius: 24,
      padding: 8,
      color: "#9E9C98",
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Upload Data"
          desc="Upload kartu keluargamu agar dapat tersimpan dengan aman."
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 18,
          }}
        >
          {dokumen ? (
            <>
              <Image source={{ uri: dokumen }} style={styles.image} />
              <PrimaryButton title="Upload" onPress={handleDokumen} />
            </>
          ) : (
            <>
              <Text style={{ fontSize: 14, color: "red" }}>
                *Pastikan dokumen yang diupload jelas dan tidak terpotong
              </Text>
              <View style={{ flexDirection: "row", gap: 6 }}>
                <PrimaryButton title="Ambil Foto" onPress={takePhoto} />
                <PrimaryButton title="Pilih dari Library" onPress={pickImage} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
