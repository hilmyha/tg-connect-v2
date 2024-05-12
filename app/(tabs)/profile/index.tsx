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
          title="Profile"
          desc="Lihat dan ubah informasi profil anda."
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
          {authState!.authenticated && authState!.user ? (
            <View>
              <Text>
                {authState!.user.name} | {authState!.user.is_admin}
              </Text>
              <Text>{authState!.user.email}</Text>
              <Text>{authState!.token}</Text>
            </View>
          ) : (
            <SplashScreen />
          )}

        </View>
      </ScrollView>
          <View
            style={{
              position: "absolute",
              width: "100%",
              alignSelf: "center",
              bottom: 16,
              paddingHorizontal: 16,
            }}
          >
            <PrimaryButton title="Logout" onPress={handleLogout} />
          </View>
    </SafeAreaView>
  );
}
