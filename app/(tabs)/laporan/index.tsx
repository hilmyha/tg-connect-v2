import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import AddButton from "../../../components/button/AddButton";
import { router } from "expo-router";
import { getLaporan } from "../../../services/LaporanService";
import { Image } from "expo-image";

function SplashScreen() {
  return (
    <ActivityIndicator size="large" color="#405B6A" style={{ marginTop: 20 }} />
  );
}

export default function index() {
  const [laporan, setLaporan] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const getDataLaporan = async () => {
      try {
        const response = await getLaporan();
        console.log("response", response);

        if (response.data.length === 0) {
          setIsEmpty(true);
        } else {
          setLaporan(response.data);
        }

        setLoading(false);
      } catch (error) {
        setIsEmpty(true);
      }
    };

    getDataLaporan();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getLaporan().then((response) => {
      setLaporan(response.data);
      setRefreshing(false);
    });
  };

  const handleCreateLaporan = () => {
    router.push("/(tabs)/laporan/create");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header
          title="Laporan dan Usulan"
          desc="Laporkan dan usulkan hal-hal yang perlu diperbaiki."
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
          <View style={{ flex: 1, gap: 12 }}>
            {loading ? (
              <SplashScreen />
            ) : isEmpty ? (
              <Text style={{ color: "red" }}>Data tidak ditemukan</Text>
            ) : (
              laporan.map((item: any) => (
                <View key={item.id}>
                  <Text>{item.kategori}</Text>
                  <Text>{item.perihal}</Text>
                  <Text>{item.isi}</Text>
                  {item.img_url ? (
                    <Image source={{ uri: item.img_url }} />
                  ) : (
                    <Text>Tidak ada gambar</Text>
                  )}
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <AddButton title="+" onPress={handleCreateLaporan} />
    </SafeAreaView>
  );
}
