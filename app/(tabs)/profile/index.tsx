import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import { useAuth } from "../../../contexts/AuthContext";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { deleteToken, getToken } from "../../../services/TokenService";
import ProfileButton from "../../../components/button/ProfileButton";
import { router } from "expo-router";
import LogoutButton from "../../../components/button/LogoutButton";
import AdminButton from "../../../components/button/AdminButton";
import { Ionicons } from "@expo/vector-icons";
import { getDokumenWarga } from "../../../services/DokumenWargaService";

function SplashScreen() {
  return (
    <ActivityIndicator size="large" color="#405B6A" style={{ marginTop: 20 }} />
  );
}

export default function index() {
  const { authState, onUser, onLogout } = useAuth();
  const [dokumenWarga, setDokumenWarga] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
    const fetchDokumenWarga = async () => {
      try {
        const response = await getDokumenWarga();
        console.log("Dokumen Warga selected: ", response.data);

        setDokumenWarga(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDokumenWarga();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    if (onUser) {
      onUser().then(() => setRefreshing(false));
    }
  };

  const revokeToken = async () => {
    await deleteToken();
  };

  const CheckToken = async () => {
    await getToken().then((res) => {
      console.log(res);
    });
  };

  function handleLogout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => onLogout && onLogout() },
    ]);
  }

  const profilMenuArr = [
    {
      title: "Upload Scan Kartu Keluarga",
      icon: "document-attach",
      onPress: () => router.push({ pathname: "(tabs)/profile/dokumenwarga" }),
    },
    {
      title: "Riwayat",
      icon: "document-text",
      onPress: () => router.push({ pathname: "(tabs)/profile/riwayat" }),
    },
  ];

  const adminMenuArr = [
    {
      title: "Kelola Pengurus RT",
      icon: "people",
      onPress: () => router.push({ pathname: "(tabs)/profile/kelolapengurus" }),
    },
    {
      title: "Rekap",
      icon: "document-text",
      onPress: () => router.push({ pathname: "(tabs)/profile/rekap" }),
    },
    {
      title: "Status Dokumen Warga",
      icon: "document-attach",
      onPress: () => router.push({ pathname: "(tabs)/profile/statusdokumen" }),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <Header
          title="Profile"
          desc="Lihat dan ubah informasi profil anda."
          headerHide={true}
        /> */}
        <View style={{ backgroundColor: "#4E6E81", height: 160 }}></View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            marginTop: -80,
          }}
        >
          {authState!.authenticated && authState!.user ? (
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View
                  style={{
                    backgroundColor: "#6b7280",
                    borderRadius: 100,
                    padding: 28,
                    marginBottom: 16,
                  }}
                >
                  <Ionicons name="person" size={54} color="white" />
                </View>
              </View>

              <View>
                <Text
                  style={{
                    fontWeight: "900",
                    fontSize: 28,
                    color: "#405B6A",
                  }}
                >
                  {authState!.user.name}
                </Text>
                <Text>{authState!.user.email}</Text>
                {/* ambil dokumen warga user */}
                <Text>
                  {dokumenWarga.map((item: any) => {
                    if (item.user_id == authState?.user?.id) {
                      return item.keterangan == 1 ? (
                        <Text
                          key={item.id}
                          style={{
                            color: "green",
                            fontWeight: "bold",
                            fontSize: 12,
                            marginTop: 4,
                          }}
                        >
                          (Terverifikasi)
                        </Text>
                      ) : (
                        <Text
                          key={item.id}
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: 12,
                            marginTop: 4,
                          }}
                        >
                          (Belum Terverifikasi)
                        </Text>
                      );
                    }
                  })}
                </Text>
              </View>

              <View
                style={{
                  borderStyle: "solid",
                  borderWidth: 0.6,
                  marginVertical: 12,
                  borderColor: "#e5e7eb",
                }}
              />

              <View style={{ gap: 8 }}>
                {authState!.user.is_admin != false ? (
                  adminMenuArr.map((item, index) => (
                    <AdminButton
                      key={index}
                      title={item.title}
                      icon={item.icon}
                      onPress={item.onPress}
                    />
                  ))
                ) : (
                  <Text>
                    Anda bukan admin, silahkan hubungi admin untuk akses lebih
                    lanjut
                  </Text>
                )}

                <View
                  style={{
                    borderStyle: "solid",
                    borderWidth: 0.6,
                    marginVertical: 12,
                    borderColor: "#e5e7eb",
                  }}
                />
                {profilMenuArr.map((item, index) => (
                  <ProfileButton
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    onPress={item.onPress}
                  />
                ))}
                <View
                  style={{
                    borderStyle: "solid",
                    borderWidth: 0.6,
                    marginVertical: 12,
                    borderColor: "#e5e7eb",
                  }}
                />
              </View>
            </View>
          ) : (
            <SplashScreen />
          )}
          <LogoutButton title="Logout" icon="log-out" onPress={handleLogout} />
          {/* <PrimaryButton title="Check token" onPress={CheckToken} />
          <PrimaryButton title="Revoke token" onPress={revokeToken} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
