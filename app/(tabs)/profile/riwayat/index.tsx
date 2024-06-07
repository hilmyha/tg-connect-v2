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
import Header from "../../../../components/layout/Header";
import { getLaporan } from "../../../../services/LaporanService";
import { getInformasi } from "../../../../services/InformasiService";
import { getUser } from "../../../../services/UserService";
import { router } from "expo-router";
import LaporanCard from "../../../../components/card/LaporanCard";
import { useAuth } from "../../../../contexts/AuthContext";
import InformationCard from "../../../../components/card/InformasiCard";
import { getDokumenWarga } from "../../../../services/DokumenWargaService";
import { Image } from "expo-image";

function SplashScreen() {
  return (
    <ActivityIndicator size="large" color="#405B6A" style={{ marginTop: 20 }} />
  );
}

export default function index() {
  const [laporan, setLaporan] = useState([]);
  const [informasi, setInformasi] = useState([]);
  const [dokumenWarga, setDokumenWarga] = useState([]);
  const { authState, onUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEmptyInformasi, setIsEmptyInformasi] = useState(false);
  const [isEmptyLaporan, setIsEmptyLaporan] = useState(false);
  const [isEmptyDokumenWarga, setIsEmptyDokumenWarga] = useState(false);

  useEffect(() => {
    if (!authState!.user && authState!.authenticated) {
      const fetchUser = async () => {
        if (onUser) {
          await onUser();
        }
      };
      fetchUser();
    }
  }, [authState!.user, authState!.authenticated, onUser]);

  useEffect(() => {
    const getDataDokumenWarga = async () => {
      try {
        const response = await getDokumenWarga();
        console.log("response Dokumen Warga", response);

        if (response.data.length === 0) {
          setIsEmptyDokumenWarga(true);
        } else {
          setDokumenWarga(response.data);
        }

        setLoading(false);
      } catch (error) {
        setIsEmptyDokumenWarga(true);
      }
    };

    const getDataLaporan = async () => {
      try {
        const response = await getLaporan();
        console.log("response Laporan", response.data.user_id);

        if (response.data.length === 0) {
          setIsEmptyLaporan(true);
        } else {
          setLaporan(response.data);
        }

        setLoading(false);
      } catch (error) {
        setIsEmptyLaporan(true);
      }
    };

    const getDataInformasi = async () => {
      try {
        const response = await getInformasi();
        console.log("response", response);

        if (response.data.length === 0) {
          setIsEmptyInformasi(true);
        } else {
          setInformasi(response.data);
        }

        setLoading(false);
      } catch (error) {
        setIsEmptyInformasi(true);
      }
    };

    getDataDokumenWarga();
    getDataLaporan();
    getDataInformasi();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Riwayat"
          desc="Riwayat adalah halaman untuk melihat riwayat."
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 14,
          }}
        >
          <Text>Riwayat dokumen warga</Text>

          {loading ? (
            <SplashScreen />
          ) : isEmptyDokumenWarga ? (
            <Text style={{ color: "red" }}>Data tidak ditemukan</Text>
          ) : (
            // ambil data user_id yang sama dengan user_id yang login
            dokumenWarga.map((item: any) => {
              if (authState!.user && item.user_id == authState!.user.id) {
                return (
                  <>
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
                  </>
                );
              }
            })
          )}

          <Text>Riwayat Laporan</Text>

          {loading ? (
            <SplashScreen />
          ) : isEmptyLaporan ? (
            <Text style={{ color: "red" }}>Data tidak ditemukan</Text>
          ) : (
            // ambil data user_id yang sama dengan user_id yang login
            laporan.map((item: any) => {
              if (authState!.user && item.user_id == authState!.user.id) {
                return (
                  <LaporanCard
                    key={item.id}
                    title={item.perihal}
                    isi={item.isi}
                    kategori={item.kategori}
                  />
                );
              }
            })
          )}

          <Text>Riwayat Informasi</Text>

          {loading ? (
            <SplashScreen />
          ) : isEmptyInformasi ? (
            <Text style={{ color: "red" }}>Data tidak ditemukan</Text>
          ) : (
            // ambil data user_id yang sama dengan user_id yang login
            informasi.map((item: any) => {
              if (authState!.user && item.user_id == authState!.user.id) {
                return (
                  <InformationCard
                    key={item.id}
                    title={item.judul}
                    date={item.tanggal}
                    time={item.waktu}
                    desc={item.deskripsi}
                  />
                );
              }
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
