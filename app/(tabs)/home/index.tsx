import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import MenuCard from "../../../components/card/MenuCard";
import InformationCard from "../../../components/card/InformasiCard";
import { getInformasi } from "../../../services/InformasiService";
import { getLaporan } from "../../../services/LaporanService";
import LaporanCard from "../../../components/card/LaporanCard";

function SplashScreen() {
  return (
    <ActivityIndicator size="large" color="#405B6A" style={{ marginTop: 20 }} />
  );
}

export default function index() {
  const [informasi, setInformasi] = useState([]);
  const [laporan, setLaporan] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isInformasiEmpty, setIsInformasiEmpty] = useState(false);
  const [isLaporanEmpty, setIsLaporanEmpty] = useState(false);

  useEffect(() => {
    const getDataInformasi = async () => {
      try {
        const response = await getInformasi();
        console.log("response", response);

        if (response.data.length === 0) {
          setIsInformasiEmpty(true);
        } else {
          // ambil 3 data terbaru
          setInformasi(response.data.slice(0, 3));
        }

        setLoading(false);
      } catch (error) {
        setIsInformasiEmpty(true);
      }
    };

    const getDataLaporan = async () => {
      try {
        const response = await getLaporan();
        console.log("response", response);

        if (response.data.length === 0) {
          setIsLaporanEmpty(true);
        } else {
          // ambil 3 data terbaru
          setLaporan(response.data.slice(0, 3));
        }

        setLoading(false);
      } catch (error) {
        setIsLaporanEmpty(true);
      }
    };

    getDataInformasi();
    getDataLaporan();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getInformasi().then((response) => {
      setInformasi(response.data.slice(0, 3));
      setRefreshing(false);
    });
    getLaporan().then((response) => {
      setLaporan(response.data.slice(0, 3));
      setRefreshing(false);
    });
  };

  const menuCardArr = [
    {
      iconame: "people",
      icolor: "#16A34A",
      bgcolor: "#22C55E",
      title: "Warga",
      link: "(pages)/warga",
    },
    {
      iconame: "information-circle",
      icolor: "#D97706",
      bgcolor: "#F59E0B",
      title: "Informasi Pengurus",
      link: "(pages)/informasipengurus",
    },
    {
      iconame: "megaphone",
      icolor: "#DC2626",
      bgcolor: "#EF4444",
      title: "Panic Button",
      link: "(pages)/panic/create",
    },
  ];

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header
          title="Home"
          desc="Selamat datang di aplikasi kami."
          headerHide={true}
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 18,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {menuCardArr.map((menuCard, index) => (
              <MenuCard
                key={index}
                icoName={menuCard.iconame}
                icoColor={menuCard.icolor}
                bgcolor={menuCard.bgcolor}
                title={menuCard.title}
                link={menuCard.link}
              />
            ))}
          </View>

          <Text style={{ fontWeight: "500", fontSize: 24, color: "#405B6A" }}>
            Informasi Terbaru
          </Text>
          <View style={{ flex: 1, gap: 12 }}>
            {loading ? (
              <SplashScreen />
            ) : isInformasiEmpty ? (
              <Text style={{ color: "red" }}>Data tidak ditemukan</Text>
            ) : (
              informasi.map((item: any) => (
                <InformationCard
                  key={item.id}
                  title={item.judul}
                  date={item.tanggal}
                  time={item.waktu}
                  desc={item.deskripsi}
                />
              ))
            )}

            <Text style={{ fontWeight: "500", fontSize: 24, color: "#405B6A" }}>
              Laporan Terbaru
            </Text>
            {loading ? (
              <SplashScreen />
            ) : isLaporanEmpty ? (
              <Text style={{ color: "red" }}>Data tidak ditemukan</Text>
            ) : (
              laporan.map((item: any) => (
                <LaporanCard
                  key={item.id}
                  title={item.perihal}
                  isi={item.isi}
                  kategori={item.kategori}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
