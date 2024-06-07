import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { createWarga } from "../../../services/WargaService";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import FormInput from "../../../components/form/FormInput";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { Picker } from "@react-native-picker/picker";

export default function index() {
  const [namaKK, setNamaKK] = useState("");
  const [blok, setBlok] = useState("");
  const [jalan, setJalan] = useState("");
  const [jumlahKeluarga, setJumlahKeluarga] = useState("");
  const [statusKependudukan, setStatusKependudukan] = useState(false);
  const [nomorHp, setNomorHp] = useState("");

  const [selectedStatusKependudukan, setSelectedStatusKependudukan] =
    useState();
  const [error, setError] = useState<string[]>([]);

  const handleDaftar = async () => {
    if (!namaKK || !blok || !jalan || !jumlahKeluarga || !nomorHp) {
      setError(["Semua kolom harus diisi."]);
      return;
    }
    try {
      await createWarga({
        nama_kk: namaKK,
        blok,
        jalan,
        jumlah_keluarga: parseInt(jumlahKeluarga),
        status_kependudukan: statusKependudukan,
        nomor_hp: nomorHp,
      });
      console.log("berhasil daftar");

      router.push("/(tabs)/home");
    } catch (error: any) {
      if (error.response) {
        // setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Daftar Warga"
          desc="Daftarkan data diri anda agar data anda tersimpan dengan aman pada layanan kami."
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
          <FormInput
            placeholder={"Nama Kartu Keluarga"}
            onChangeText={(text) => setNamaKK(text)}
            value={namaKK}
            type="default"
            errors={error}
          />
          <FormInput
            placeholder={"Blok"}
            onChangeText={(text) => setBlok(text)}
            value={blok}
            type="default"
            errors={error}
          />
          <FormInput
            placeholder={"Jalan"}
            onChangeText={(text) => setJalan(text)}
            value={jalan}
            type="default"
            errors={error}
          />
          <FormInput
            placeholder={"Jumlah Keluarga"}
            onChangeText={(text) => setJumlahKeluarga(text)}
            value={jumlahKeluarga.toString()}
            type="number-pad"
            errors={error}
          />
          <View style={{ backgroundColor: "white", borderRadius: 10 }}>
            <Picker
              style={{
                color: "#9E9C98",
              }}
              selectedValue={selectedStatusKependudukan}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedStatusKependudukan(itemValue);
                setStatusKependudukan(itemValue === "1" ? true : false);
              }}
            >
              <Picker.Item label="Kontrak" value="0" />
              <Picker.Item label="Tetap" value="1" />
            </Picker>
          </View>
          <FormInput
            placeholder={"Nomor HP"}
            onChangeText={(text) => setNomorHp(text)}
            value={nomorHp}
            type="phone-pad"
            errors={error}
          />
          <Text style={{ fontSize: 12 }}>
            Jangan lupa untuk melampirkan Kartu Keluarga anda pada menu profil
            untuk diserahkan kepada pengurus RT.
          </Text>
          <PrimaryButton onPress={handleDaftar} title="Daftar" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
