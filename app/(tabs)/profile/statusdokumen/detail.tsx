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
  deleteDokumenWarga,
  getDokumenWargaById,
  updateDokumen,
} from "../../../../services/DokumenWargaService";
import { Picker } from "@react-native-picker/picker";
import PrimaryButton from "../../../../components/button/PrimaryButton";
import { Image } from "expo-image";
import SecondaryButton from "../../../../components/button/SecondaryButton";

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

  const handleDelete = async () => {
    Alert.alert(
      "Hapus Dokumen",
      "Apakah anda yakin ingin menghapus dokumen ini?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: async () => {
            try {
              await deleteDokumenWarga(id ?? "");
              router.push({ pathname: "(tabs)/profile/statusdokumen" });
            } catch (error: any) {
              console.error("Error deleting data:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      // buat style ditenagah page
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar style="light" backgroundColor="#405B6A" />
      {/* buat view di center page */}
      <View
        style={{
          padding: 32,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Switch
            value={Boolean(dokumenData.keterangan)}
            trackColor={{ false: "#767577", true: "#405B6A" }}
            thumbColor={
              Boolean(dokumenData?.keterangan) ? "#405B6A" : "#f4f3f4"
            }
            onValueChange={(value) => {
              setDokumenData({ ...dokumenData, keterangan: Number(value) });
            }}
          />
          <Text>
            {dokumenData?.keterangan ? "Terverifikasi" : "Belum Terverifikasi"}
          </Text>
        </View>
        <View style={{ flexDirection: "column", gap: 8 }}>
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
          <SecondaryButton onPress={handleDelete} title="Hapus" />
        </View>
      </View>
    </SafeAreaView>
  );
}
