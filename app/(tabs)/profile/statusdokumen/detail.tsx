import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import {
  getDokumenWargaById,
  updateDokumen,
} from "../../../../services/DokumenWargaService";
import { Picker } from "@react-native-picker/picker";
import PrimaryButton from "../../../../components/button/PrimaryButton";

type Dokumen = {
  dokumen: string;
  keterangan: number;
  // user: {
  //   name: string;
  //   is_admin: number;
  // };
};

export default function detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [dokumenData, setDokumenData] = useState<Dokumen>({
    dokumen: "",
    keterangan: 0,
    // user: {
    //   name: "",
    //   is_admin: 0,
    // },
  });

  useEffect(() => {
    const getDokumenDetail = async (id: string) => {
      try {
        const response = await getDokumenWargaById(id);
        console.log("Dokumen Detail selected: ", response.data);
        setDokumenData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDokumenDetail(id ?? "");
  }, []);

  const handleUpdate = async () => {
    try {
      await updateDokumen(id ?? "", {
        ...dokumenData,
        keterangan: Boolean(dokumenData.keterangan),
      });

      console.log("berhasil update");
      console.log("dokumenData", dokumenData);

      // Redirect to previous page after successful update
      router.push({ pathname: "(tabs)/profile/statusdokumen" });
    } catch (error: any) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            marginTop: 14,
          }}
        >
          {/* buatkan UI seperti kartu yang menarik */}
          <View
            style={{
              backgroundColor: "#f9fafb",
              padding: 16,
              borderRadius: 8,
            }}
          >
            {/* <Switch
              value={Boolean(dokumenData?.keterangan)}
              trackColor={{ false: "#767577", true: "#405B6A" }}
              thumbColor={
                Boolean(dokumenData?.keterangan) ? "#405B6A" : "#f4f3f4"
              }
              onValueChange={(value) => {
                setDokumenData({ ...dokumenData, keterangan: Number(value) });
              }}
            /> */}
            <Picker
              selectedValue={dokumenData?.keterangan}
              onValueChange={(itemValue) =>
                setDokumenData({ ...dokumenData, keterangan: itemValue })
              }
            >
              <Picker.Item label="Belum Terverifikasi" value={0} />
              <Picker.Item label="Terverifikasi" value={1} />
            </Picker>

            <PrimaryButton
              onPress={() =>
                Alert.alert(
                  "Peringatan",
                  "Apakah anda yakin ingin mengupdate data warga ini?",
                  [
                    {
                      text: "Batal",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Update",
                      onPress: () => handleUpdate(),
                    },
                  ],
                  { cancelable: false }
                )
              }
              title="Update"
            />

            <Text style={{ color: "black", padding: 2 }}>{dokumenData?.keterangan}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
