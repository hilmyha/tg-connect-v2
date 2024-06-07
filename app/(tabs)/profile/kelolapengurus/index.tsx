import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../../../../components/layout/Header";
import { getUser } from "../../../../services/UserService";
import { router } from "expo-router";
import AdminCard from "../../../../components/card/AdminCard";

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
            >
              <AdminCard
                name={item.name}
                email={item.email}
                is_admin={item.is_admin == true ? "Admin" : "User"}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
