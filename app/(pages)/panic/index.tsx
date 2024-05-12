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
import { getPanic } from "../../../services/PanicService";

function SplashScreen() {
  return (
    <ActivityIndicator size="large" color="#405B6A" style={{ marginTop: 20 }} />
  );
}

export default function index() {
  const [panic, setPanic] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const getDataPanic = async () => {
      try {
        const response = await getPanic();
        console.log("response", response);

        if (response.data.length === 0) {
          setIsEmpty(true);
        } else {
          setPanic(response.data);
        }

        setLoading(false);
      } catch (error) {
        setIsEmpty(true);
      }
    };

    getDataPanic();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getPanic().then((response) => {
      setPanic(response.data);
      setRefreshing(false);
    });
  };

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
          title="Panic Log"
          desc="Laporkan kejadian darurat disini."
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
            panic.map((item: any) => (
              <View key={item.id}>
                <Text>{item.id}</Text>
                <Text>{item.user_id}</Text>
                <Text>{item.latitude}</Text>
                <Text>{item.longitude}</Text>
                <Text>{item.created_at}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
