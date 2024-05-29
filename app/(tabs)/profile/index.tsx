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

function SplashScreen() {
  return (
    <ActivityIndicator size="large" color="#405B6A" style={{ marginTop: 20 }} />
  );
}

export default function index() {
  const { authState, onUser, onLogout } = useAuth();
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
      onPress: () => console.log("Profile"),
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
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            marginTop: 14,
          }}
        >
          {authState!.authenticated && authState!.user ? (
            <View style={{ gap: 16 }}>
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontWeight: "900",
                    fontSize: 28,
                    color: "#405B6A",
                  }}
                >
                  Selamat datang di aplikasi kami, {authState!.user.name}!
                </Text>
                <Text>
                  Nikmati fitur-fitur yang kami sediakan untuk memudahkan anda
                </Text>
              </View>

              <View style={{ gap: 8 }}>
                {authState!.user.is_admin ? (
                  adminMenuArr.map((item, index) => (
                    <AdminButton
                      key={index}
                      title={item.title}
                      icon={item.icon}
                      onPress={item.onPress}
                    />
                  ))
                ) : (
                  <View style={{ marginBottom: -12 }} />
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
                <LogoutButton
                  title="Logout"
                  icon="log-out"
                  onPress={handleLogout}
                />
              </View>
            </View>
          ) : (
            <SplashScreen />
          )}
          <PrimaryButton title="Check token" onPress={CheckToken} />
          <PrimaryButton title="Revoke token" onPress={revokeToken} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
