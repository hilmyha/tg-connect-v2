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
import Header from "../../../../components/layout/Header";
import { router, useLocalSearchParams } from "expo-router";
import { getUserById, updateUser } from "../../../../services/UserService";
import PrimaryButton from "../../../../components/button/PrimaryButton";

type User = {
  name: string;
  email: string;
  is_admin: number;
  password: string;
  created_at: string;
  user_id: number;
};

export default function detail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    is_admin: 0,
    password: "",
    created_at: "",
    user_id: 0,
  });

  useEffect(() => {
    const getUserDetail = async (id: string) => {
      try {
        const response = await getUserById(id);
        console.log("User Detail selected: ", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUserDetail(id ?? "");
  }, []);

  const handleUpdate = async () => {
    try {
      await updateUser(id ?? "", {
        ...userData,
        is_admin: Boolean(userData.is_admin),
      });

      console.log("berhasil update");
      console.log("userData", userData);

      // Redirect to previous page after successful update
      router.push({ pathname: "(tabs)/profile/kelolapengurus" });
    } catch (error: any) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Detail Pengurus" desc="Detail pengurus yang ada di RT" />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 18,
          }}
        >
          <View
            style={{
              backgroundColor: "#f9fafb",
              padding: 16,
              borderTopStartRadius: 8,
              borderTopEndRadius: 8,
              borderBottomWidth: 1,
              borderColor: "#d1d5db",
            }}
          >
            <Text>
              Bergabung pada :{" "}
              {new Date(userData?.created_at).toLocaleDateString()}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  Nama : {userData.name}{" "}
                </Text>
                <Text>
                  Status : {userData.is_admin == 1 ? "Admin" : "User"}
                </Text>
              </View>
              <Switch
                value={Boolean(userData?.is_admin == 1)}
                trackColor={{ false: "#767577", true: "#405B6A" }}
                // thumbColor={Boolean(userData?.is_admin) == true ? "#405B6A" : "#f4f3f4"}
                thumbColor={
                  Boolean(userData?.is_admin) == true ? "#f4f3f4" : "#405B6A"
                }
                onValueChange={(value) =>
                  setUserData({ ...userData, is_admin: Number(value) })
                }
              />
            </View>
          </View>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
