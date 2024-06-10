import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../../components/layout/Header";
import {
  downloadRecap,
  recapData,
  showRecap,
} from "../../../../services/WargaService";
import PrimaryButton from "../../../../components/button/PrimaryButton";
import * as FileSystem from "expo-file-system";

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

  const handleRecap = async () => {
    try {
      await recapData();
      // then fetch data again
      const response = await showRecap();
      setRecap(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadRecap = async (filename: any) => {
    const filenames = `${filename}`;
    const result = await FileSystem.downloadAsync(
      `https://tgconnect.my.id/storage/${filename}`,
      FileSystem.documentDirectory + filenames
    );

    console.log("result", result);

    saveFile(result.uri, filenames, result.headers["content-type"]);
  };

  const saveFile = async (uri: any, filename: any, mimetype: any) => {
    if (Platform.OS === "android") {
      const permission =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permission.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permission.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        Alert.alert(
          "Perizinan diperlukan",
          "Perizinan diperlukan untuk menyimpan file"
        );
      }
    } else {
      Alert.alert(
        "Perizinan diperlukan",
        "Perizinan diperlukan untuk menyimpan file"
      );
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
          <View>
            {loading ? (
              <SplashScreen />
            ) : isEmpty ? (
              <Text>Data kosong</Text>
            ) : (
              recap.map((item: any, index: any) => (
                <Pressable
                  style={{
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: "#d1d5db",
                  }}
                  key={index}
                  onPress={() =>
                    Alert.alert(
                      "Download Rekap",
                      "Apakah anda yakin ingin mendownload rekap?",
                      [
                        {
                          text: "Batal",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Iya",
                          onPress: () => handleDownloadRecap(item),
                        },
                      ]
                    )
                  }
                >
                  {/* komposisi nama + tanggal */}
                  <Text
                    style={{
                      color: "#405B6A",
                    }}
                  >
                    Rekap data pada | {item.split("-")[4]} - {item.split("-")[3]} -{" "}
                    {item.split("-")[2]}
                  </Text>
                </Pressable>
              ))
            )}
          </View>
          <Text style={{ color: "red" }}>
            *Klik untuk mendownload rekap data
          </Text>
          <PrimaryButton
            title="Tambah Rekap"
            onPress={() =>
              Alert.alert(
                "Tambah Rekap",
                "Apakah anda yakin ingin menambah rekap?",
                [
                  {
                    text: "Batal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Iya",
                    onPress: () => handleRecap(),
                  },
                ]
              )
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
