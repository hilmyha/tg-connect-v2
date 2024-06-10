import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import { getPubUser } from "../../../services/UserService";
import PengurusCard from "../../../components/card/PengurusCard";
import { router } from "expo-router";
import { getWarga } from "../../../services/WargaService";

function SplashScreen() {
  return (
    <ActivityIndicator size="large" color="#405B6A" style={{ marginTop: 20 }} />
  );
}

export default function index() {
  const [user, setUser] = useState([]);
  const [warga, setWarga] = useState<{ user_id: string; id: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPubUser();
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setIsEmpty(true);
      }
    };

    const fetchWarga = async () => {
      try {
        const response = await getWarga();
        setWarga(response.data);
        setLoading(false);
      } catch (error) {
        setIsEmpty(true);
      }
    };

    fetchData();
    fetchWarga();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Informasi Pengurus"
          desc="Informasi pengurus yang ada di RT"
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 14,
          }}
        >
          {/* get user dengan role is_admin = true */}
          {loading ? (
            <SplashScreen />
          ) : isEmpty ? (
            <Text style={{ color: "red" }}>Data tidak ditemukan</Text>
          ) : (
            user.map((item: any) => {
              if (item.is_admin == true && item.name != "Administrator") {
                return (
                  <Pressable
                    key={item.id}
                    // ambil data user dengan data warga yang sama
                    onPress={() => {
                      const selectedWarga = warga.find(
                        (warga) => warga.user_id == item.id
                      );
                      // push ke halaman detail warga
                      router.push({
                        pathname: "(pages)/warga/detail",
                        params: { id: selectedWarga?.id },
                      });
                    }}
                  >
                    <PengurusCard
                      key={item.id}
                      name={item.name}
                      email={item.email}
                    />
                  </Pressable>
                );
              }
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
