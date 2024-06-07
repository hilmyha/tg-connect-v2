import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import FormInput from "../../../components/form/FormInput";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { createLaporan } from "../../../services/LaporanService";
import PrimaryButton from "../../../components/button/PrimaryButton";

export default function create() {
  const [kategori, setKategori] = useState("");
  const [perihal, setPerihal] = useState("");
  const [isi, setIsi] = useState("");
  const [image, setImage] = useState("");

  const [selectedKategori, setSelectedKategori] = useState();

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
      // aspect: [4, 3],
      aspect: [16, 9],
      quality: 1,
    });

    // set image dari hasil pick image
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      aspect: [16, 9],
      quality: 1,
    });

    // set image dari hasil pick image
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLaporan = async () => {
    try {
      if (!kategori || !perihal || !isi) {
        setError(["Semua kolom harus diisi"]);
        return;
      } else {
        setError([]);
      }

      console.log(kategori, perihal, isi, image);

      // Jika tidak ada gambar yang dipilih, kirimkan string kosong
      const img_url = image ? image : "";
      await createLaporan({
        kategori,
        perihal,
        isi,
        img_url,
      });

      router.push("(tabs)/laporan");
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
        <Header title="Buat Laporan/Usulan" desc="" headerHide={false} />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 14,
          }}
        >
          <Picker
            style={styles.picker}
            selectedValue={selectedKategori}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedKategori(itemValue);
              setKategori(itemValue === "usulan" ? "usulan" : "laporan");
            }}
          >
            <Picker.Item label="Usulan" value="usulan" />
            <Picker.Item label="Laporan" value="laporan" />
          </Picker>
          <FormInput
            placeholder={"Perihal"}
            onChangeText={(text) => setPerihal(text)}
            value={perihal}
            type="default"
            errors={error}
          />
          <FormInput
            placeholder={"Isi Laporan/Usulan"}
            onChangeText={(text) => setIsi(text)}
            value={isi}
            type="default"
            errors={error}
          />
          {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <PrimaryButton title="Ambil Foto" onPress={takePhoto} />
          )}

          <PrimaryButton title="Kirim" onPress={handleLaporan} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
