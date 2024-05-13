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
import { getPanic } from "../../../services/PanicService";
import PanicCard from "../../../components/card/PanicCard";
import { router } from "expo-router";

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
          // ambil data create_at dan jadikan ke local time
          const data = response.data.map((item: any) => {
            const date = new Date(item.created_at);
            return {
              ...item,
              created_at: date.toLocaleString(),
            };
          });

          setPanic(data);
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
      const data = response.data.map((item: any) => {
        // fix time
        const date = new Date(item.created_at);
        return {
          ...item,
          created_at: date.toLocaleString(),
        };
      });

      setPanic(data);
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
              <Pressable
                key={item.id}
                onPress={() =>
                  router.push({
                    pathname: "/(pages)/panic/detail",
                    params: { id: item.id },
                  })
                }
              >
                <PanicCard
                  id={item.id}
                  time={item.created_at}
                  latitude={item.latitude}
                  longitude={item.longitude}
                />
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
