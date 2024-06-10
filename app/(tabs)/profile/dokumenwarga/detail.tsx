import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import {
  deleteDokumenWarga,
  getDokumenWargaById,
  updateDokumen,
} from "../../../../services/DokumenWargaService";
import SecondaryButton from "../../../../components/button/SecondaryButton";

type Dokumen = {
  dokumen: string;
  keterangan: number;
};

export default function detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [dokumenData, setDokumenData] = useState<Dokumen>({
    dokumen: "",
    keterangan: 0,
  });

  useEffect(() => {
    const getDokumenDetail = async (id: string) => {
      try {
        const response = await getDokumenWargaById(id);
        console.log("Dokumen Detail selected: ", response.data);
        setDokumenData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDokumenDetail(id ?? "");
  }, []);

  const handleDelete = async () => {
    Alert.alert(
      "Hapus Dokumen",
      "Apakah anda yakin ingin menghapus dokumen ini?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: async () => {
            try {
              await deleteDokumenWarga(id ?? "");
              router.push({ pathname: "(tabs)/profile/dokumenwarga" });
            } catch (error: any) {
              console.error("Error deleting data:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      // buat style ditenagah page
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar style="light" backgroundColor="#405B6A" />
      {/* buat view di center page */}
      <View
        style={{
          padding: 32,
        }}
      >
        <View
          style={{
            marginBottom: 16,
          }}
        >
          <SecondaryButton onPress={handleDelete} title="Hapus" />
        </View>
      </View>
    </SafeAreaView>
  );
}
