import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import FormInput from "../../../components/form/FormInput";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { Link } from "expo-router";
import Header from "../../../components/layout/Header";
import { getToken } from "../../../services/TokenService";

export default function index() {
  const { onLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username: []; password: [] }>({
    username: [],
    password: [],
  });

  const handleLogin = async () => {
    try {
      const response = await onLogin!(username, password);
      if (response && response.errors) {
        setErrors(response.errors);
      }
    } catch (error: any) {
      const err = error.response.data.errors;
      setErrors(err);
    }
  };

  const CheckToken = async () => {
    getToken().then((res) => {
      console.log(res);
    });
  }

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Login" desc="Silahkan masuk untuk melanjutkan." headerHide={true} />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 14,
          }}
        >
          <FormInput
            placeholder={"Username"}
            onChangeText={(text) => setUsername(text)}
            value={username}
            type="default"
            errors={errors?.username}
          />
          <FormInput
            placeholder={"Password"}
            onChangeText={(text) => setPassword(text)}
            value={password}
            type="password"
            secureTextEntry={true}
            errors={errors?.password}
          />
          <PrimaryButton onPress={handleLogin} title="Login" />
          {/* <PrimaryButton onPress={CheckToken} title="Check token" /> */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 14,
            }}
          >
            <Text>Belum punya akun?</Text>
            <Pressable>
              <Link href={"(auth)/register"} asChild>
                <Text style={{ textDecorationStyle: "dashed", textDecorationLine: "underline", marginLeft: 4 }}>Daftar sekarang</Text>
              </Link>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
