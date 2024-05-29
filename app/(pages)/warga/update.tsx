import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getWargaById, updateWarga } from "../../../services/WargaService";
import { StatusBar } from "expo-status-bar";
import FormInput from "../../../components/form/FormInput";
import Header from "../../../components/layout/Header";
import { Picker } from "@react-native-picker/picker";
import PrimaryButton from "../../../components/button/PrimaryButton";

type Warga = {
  nama_kk: string;
  jalan: string;
  blok: string;
  status_kependudukan: number;
  jumlah_keluarga: number;
  nomor_hp: string;
};

export default function update() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [wargaData, setWargaData] = useState<Warga>({
    nama_kk: "",
    jalan: "",
    blok: "",
    status_kependudukan: 0,
    jumlah_keluarga: 0,
    nomor_hp: "",
  });

  useEffect(() => {
    const getWargaDetail = async (id: string) => {
      try {
        const response = await getWargaById(id);
        console.log("Warga Detail selected: ", response.data);
        setWargaData(response.data || wargaData); // In case response.data is null, maintain the existing wargaData
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getWargaDetail(id ?? "");
  }, []);

  const handleUpdate = async () => {
    try {
      await updateWarga(id ?? "", {
        ...wargaData,
        status_kependudukan: Boolean(wargaData.status_kependudukan),
      });
      console.log("berhasil update");
      console.log("wargaData", wargaData);

      router.push("/(pages)/warga");
    } catch (error: any) {
      console.error("Error updating data:", error);
    }
  };

  const styles = StyleSheet.create({
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
        <Header title="Update Warga" desc="Update data warga" />
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
            onChangeText={(text) =>
              setWargaData({ ...wargaData, nama_kk: text })
            }
            value={wargaData.nama_kk}
            type="default"
            // errors={errors?.namaKK}
          />
          <FormInput
            placeholder={"Blok"}
            onChangeText={(text) => setWargaData({ ...wargaData, blok: text })}
            value={wargaData.blok}
            type="default"
            // errors={errors?.username}
          />
          <FormInput
            placeholder={"Jalan"}
            onChangeText={(text) => setWargaData({ ...wargaData, jalan: text })}
            value={wargaData.jalan}
            type="default"
            // errors={errors?.email}
          />
          <FormInput
            placeholder={"Jumlah Keluarga"}
            onChangeText={(text) =>
              setWargaData({
                ...wargaData,
                jumlah_keluarga: text ? parseInt(text) : 0,
              })
            }
            value={wargaData.jumlah_keluarga.toString()}
            type="number-pad"
            // errors={errors?.username}
          />
          <View>
            <Picker
              // className="items-center bg-white rounded-lg px-4 py-3 flex-1 text-[#9E9C98]"
              style={styles.picker}
              selectedValue={wargaData.status_kependudukan ? "1" : "0"}
              onValueChange={(itemValue, itemIndex) => {
                setWargaData({
                  ...wargaData,
                  status_kependudukan: itemValue === "1" ? 1 : 0,
                });
              }}
            >
              <Picker.Item label="Kontrak" value="0" />
              <Picker.Item label="Tetap" value="1" />
            </Picker>
          </View>
          <FormInput
            placeholder={"Nomor HP"}
            onChangeText={(text) =>
              setWargaData({ ...wargaData, nomor_hp: text })
            }
            value={wargaData.nomor_hp}
            type="phone-pad"
            // errors={errors?.username}
          />
          <PrimaryButton title="Update" onPress={handleUpdate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
