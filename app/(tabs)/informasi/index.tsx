import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import { getInformasi } from "../../../services/InformasiService";
import InformationCard from "../../../components/card/InformasiCard";
import AddButton from "../../../components/button/AddButton";
import { router } from "expo-router";

function SplashScreen() {
  return (
    <ActivityIndicator size="large" color="#405B6A" style={{ marginTop: 20 }} />
  );
}

export default function index() {
  const [informasi, setInformasi] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const getDataInformasi = async () => {
      try {
        const response = await getInformasi();
        console.log("response", response);

        if (response.data.length === 0) {
          setIsEmpty(true);
        } else {
          setInformasi(response.data);
        }

        setLoading(false);
      } catch (error) {
        setIsEmpty(true);
      }
    };

    getDataInformasi();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getInformasi().then((response) => {
      setInformasi(response.data);
      setRefreshing(false);
    });
  };

  const handleCreateInformasi = () => {
    router.push("/(tabs)/informasi/create");
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
          title="Informasi"
          desc="Informasi terkini seputar RT 09."
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
              informasi.map((item: any) => (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    router.push({
                      pathname: "(tabs)/informasi/detail",
                      params: { id: item.id },
                    })
                  }
                >
                  <InformationCard
                    title={item.judul}
                    date={item.tanggal}
                    time={item.waktu}
                    desc={item.deskripsi}
                  />
                </Pressable>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <AddButton title="+" onPress={handleCreateInformasi} />
    </SafeAreaView>
  );
}
