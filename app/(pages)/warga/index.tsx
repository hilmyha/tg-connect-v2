import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import { getWarga } from "../../../services/WargaService";
import WargaCard from "../../../components/card/WargaCard";
import { router } from "expo-router";

function SplashScreen() {
  return (
    <ActivityIndicator size="large" color="#405B6A" style={{ marginTop: 20 }} />
  );
}

export default function index() {
  const [warga, setWarga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWarga();
        setWarga(response.data);
        setLoading(false);
      } catch (error) {
        setIsEmpty(true);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Warga"
          desc="Warga adalah halaman untuk melihat data warga."
          headerHide={false}
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 14,
          }}
        >
          {loading ? (
            <SplashScreen />
          ) : isEmpty ? (
            <Text style={{ color: "red" }}>Data tidak ditemukan</Text>
          ) : (
            warga.map((item: any) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  router.push({
                    pathname: "/(pages)/warga/detail",
                    params: { id: item.id },
                  })
                }
              >
                <WargaCard
                  name={item.nama_kk}
                  jalan={item.jalan}
                  blok={item.blok}
                />
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
