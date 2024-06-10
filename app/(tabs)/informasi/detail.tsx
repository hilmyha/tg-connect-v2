import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import {
  deleteLaporan,
  getLaporanById,
} from "../../../services/LaporanService";
import { Image } from "expo-image";
import { loadUser } from "../../../services/AuthService";
import SecondaryButton from "../../../components/button/SecondaryButton";
import {
  deleteInformasi,
  getInformasiById,
} from "../../../services/InformasiService";

type Informasi = {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: string;
  waktu: string;
  user_id: number;
};

export default function detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<any>();
  const [selectedInformasi, setSelectedInformasi] = useState<Informasi | null>(
    null
  );

  useEffect(() => {
    const getLaporanDetail = async (id: string) => {
      try {
        const response = await getInformasiById(id);
        console.log("Laporan Detail selected: ", response.data);
        setSelectedInformasi(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await loadUser();
        console.log("User: ", response.id);
        setUser(response.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
    getLaporanDetail(id ?? "");
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Hapus Laporan",
      "Apakah anda yakin ingin menghapus laporan ini?",
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
              await deleteInformasi(id ?? "");
              router.push("/informasi");
            } catch (error) {
              console.error("Error deleting data:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={selectedInformasi?.judul ?? `Detail Laporan`} desc="" />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 14,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#6b7280",
                fontSize: 13,
                fontWeight: "400",
              }}
            >
              Pada hari {selectedInformasi?.tanggal} pukul{" "}
              {selectedInformasi?.waktu}
            </Text>
            <Text style={{ fontSize: 16, color: "#405B6A", marginTop: 12 }}>
              {selectedInformasi?.deskripsi}
            </Text>
          </View>
          {user == selectedInformasi?.user_id && (
            <SecondaryButton title="Hapus" onPress={handleDelete} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
