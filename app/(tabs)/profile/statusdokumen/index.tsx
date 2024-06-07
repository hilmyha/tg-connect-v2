import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../../components/layout/Header";
import { getDokumenWarga } from "../../../../services/DokumenWargaService";
import { router } from "expo-router";
import { Image } from "expo-image";

export default function index() {
  const [dokumenWarga, setDokumenWarga] = useState([]);

  useEffect(() => {
    const fetchDokumenWarga = async () => {
      try {
        const response = await getDokumenWarga();
        setDokumenWarga(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDokumenWarga();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Status Dokumen" desc="Status dokumen yang ada di RT" />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 18,
          }}
        >
          {dokumenWarga.map((item: any) => (
            <Pressable
              key={item.id}
              style={{
                paddingVertical: 8,
              }}
              onPress={() =>
                router.push({
                  pathname: "(tabs)/profile/statusdokumen/detail",
                  params: { id: item.id },
                })
              }
            >
              <Image
                source={{
                  uri: `https://tgconnect.my.id/storage/${item.dokumen}`,
                }}
                // source={{ uri: `http://10.0.2.2:8000/storage/${item.dokumen}` }}
                style={{
                  width: "100%",
                  height: 200,
                  marginBottom: 12,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#d1d5db",
                }}
              >
                <Text
                  style={{
                    color: "#374151",
                    fontWeight: "500",
                  }}
                >
                  {item.user.name}
                </Text>
                {item.keterangan == 0 ? (
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      fontSize: 12,
                      color: "red",
                    }}
                  >
                    Belum terverifikasi
                  </Text>
                ) : (
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      fontSize: 12,
                      color: "green",
                    }}
                  >
                    Sudah terverifikasi
                  </Text>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
