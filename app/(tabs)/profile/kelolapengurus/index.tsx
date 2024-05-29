import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../../components/layout/Header";
import { getUser } from "../../../../services/UserService";
import { router } from "expo-router";

export default function index() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser();
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Kelola Pengurus" desc="Kelola pengurus yang ada di RT" />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 18,
          }}
        >
          {user.map((item: any) => (
            <Pressable
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "(tabs)/profile/kelolapengurus/detail",
                  params: { id: item.id },
                })
              }
              style={{
                backgroundColor: "#f9fafb",
                padding: 16,
                borderTopStartRadius: 8,
                borderTopEndRadius: 8,
                borderBottomWidth: 1,
                borderColor: "#d1d5db",
              }}
            >
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.is_admin ? "Admin" : "User"}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
