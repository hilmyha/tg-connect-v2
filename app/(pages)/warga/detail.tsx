import {
  View,
  Text,
  Linking,
  Alert,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getWargaById } from "../../../services/WargaService";
import { loadUser } from "../../../services/AuthService";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import { Ionicons } from "@expo/vector-icons";

type Warga = {
  nama_kk: string;
  jalan: string;
  blok: string;
  nomor_hp: string;
  status_kependudukan: number;
  jumlah_keluarga: number;
  user_id: number;
};

export default function detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<any>();
  const [selectedWarga, setSelectedWarga] = useState<Warga | null>(null);

  useEffect(() => {
    const getWargaDetail = async (id: string) => {
      try {
        const response = await getWargaById(id);
        console.log("Warga Detail selected: ", response.data);
        setSelectedWarga(response.data);
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
    getWargaDetail(id ?? "");
  }, []);

  const handleWhatsapp = () => {
    const messageText = `Halo, apakah benar ini bapak/ibu ${selectedWarga?.nama_kk}? Saya ingin menghubungi anda.`;

    Alert.alert(
      "Peringatan",
      "Fitur hubungi warga hanya digunakan saat penting, apakah anda yakin?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Hubungi",
          onPress: () =>
            Linking.openURL(
              `https://wa.me/62${selectedWarga?.nomor_hp}?text=${messageText}`
            ),
        },
      ],
      { cancelable: false }
    );
  };

  const handleUpdate = () => {
    router.push({
      pathname: "(pages)/warga/update",
      params: { id: id },
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title={selectedWarga?.nama_kk ?? ""}
          desc=""
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
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              padding: 16,
              borderRadius: 14,
              marginTop: -46,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "#d1d5db",
                paddingBottom: 12,
                marginBottom: 12,
              }}
            >
              <Ionicons name="home" size={24} color="#374151" />
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#374151" }}
              >
                Informasi Penduduk
              </Text>
            </View>
            <Text style={{ color: "#374151", marginBottom: 8 }}>
              Perumahan taman gading Jl. {selectedWarga?.jalan},{" "}
              {selectedWarga?.blok}, Tegalkamulyan
            </Text>
            <Text style={{ color: "#374151", marginBottom: 14 }}>
              {selectedWarga?.jumlah_keluarga} anggota keluarga
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: "#d1d5db",
                paddingVertical: 12,
                marginBottom: 12,
              }}
            >
              <Ionicons name="information-circle" size={24} color="#374151" />
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#374151" }}
              >
                Keterangan
              </Text>
            </View>
            {selectedWarga?.status_kependudukan === 1 ? (
              <View
                style={{
                  backgroundColor: "#22c55e",
                  borderWidth: 2,
                  borderColor: "#16a34a",
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "white" }}>Menetap</Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "#f97316",
                  borderWidth: 2,
                  borderColor: "#ea580c",
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "white" }}>Kontrak</Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1, gap: 12, marginTop: 12 }}>
            <Pressable onPress={handleWhatsapp}>
              <View
                style={{
                  backgroundColor: "#22c55e",
                  padding: 12,
                  borderRadius: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="logo-whatsapp" size={24} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    marginLeft: 8,
                  }}
                >
                  Hubungi Warga
                </Text>
              </View>
            </Pressable>
            {user === selectedWarga?.user_id && (
              <Pressable onPress={handleUpdate}>
                <View
                  style={{
                    backgroundColor: "#3b82f6",
                    padding: 12,
                    borderRadius: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="pencil" size={24} color="white" />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "500",
                      marginLeft: 8,
                    }}
                  >
                    Update Datamu
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
