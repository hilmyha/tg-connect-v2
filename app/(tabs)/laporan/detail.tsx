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

type Laporan = {
  id: string;
  kategori: string;
  perihal: string;
  isi: string;
  img_url: string;
  user_id: number;
};

export default function detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<any>();
  const [selectedLaporan, setSelectedLaporan] = useState<Laporan | null>(null);

  useEffect(() => {
    const getLaporanDetail = async (id: string) => {
      try {
        const response = await getLaporanById(id);
        console.log("Laporan Detail selected: ", response.data);
        setSelectedLaporan(response.data.data);
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
              await deleteLaporan(id ?? "");
              router.push("/laporan");
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
        <Header
          title={selectedLaporan?.kategori ?? `Detail Laporan`}
          desc={selectedLaporan?.perihal ?? `Detail Laporan`}
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 14,
          }}
        >
          {selectedLaporan?.img_url ? (
            <Image
              source={{
                uri: `https://tgconnect.my.id/storage/${selectedLaporan.img_url}`,
              }}
              style={{
                width: "100%",
                height: 300,
                marginBottom: 12,
              }}
            />
          ) : (
            <Text>Tidak ada gambar</Text>
          )}
          <Text style={{ fontSize: 16 }}>{selectedLaporan?.isi}</Text>
          {user == selectedLaporan?.user_id && (
            <SecondaryButton title="Hapus" onPress={handleDelete} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
