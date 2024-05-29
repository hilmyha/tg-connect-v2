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
import { downloadRecap, showRecap } from "../../../../services/WargaService";
import PrimaryButton from "../../../../components/button/PrimaryButton";

function SplashScreen() {
  return (
    <ActivityIndicator size="large" color="#405B6A" style={{ marginTop: 20 }} />
  );
}

export default function index() {
  const [recap, setRecap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchRecapData = async () => {
      try {
        const response = await showRecap();
        setRecap(response.data);
        setLoading(false);
      } catch (error) {
        setIsEmpty(true);
        console.log(error);
      }
    };

    fetchRecapData();
  }, []);

  const handleDownloadRecap = async (filename: string) => {
    // download recap dengan hit ke endpoint download-recap
    try {
      const response = await downloadRecap(filename);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Rekap" desc="Rekap data warga" />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 14,
          }}
        >
          <Text>Rekap data warga</Text>
          <View>
            {loading ? (
              <SplashScreen />
            ) : isEmpty ? (
              <Text>Data kosong</Text>
            ) : (
              recap.map((item: any, index: any) => (
                <Pressable
                  key={index}
                  onPress={() => handleDownloadRecap(item)}
                >
                  <Text>{item}</Text>
                </Pressable>
              ))
            )}
          </View>
          <PrimaryButton
            title="Tambah Rekap"
            onPress={() => {
              console.log("Tambah Rekap");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
