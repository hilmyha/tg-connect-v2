import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import FormInput from "../../../components/form/FormInput";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { Link, router } from "expo-router";
import Header from "../../../components/layout/Header";

export default function index() {
  const { onRegister } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<{
    name: [];
    username: [];
    email: [];
    password: [];
    passwordConfirmation: [];
  }>({
    name: [],
    username: [],
    email: [],
    password: [],
    passwordConfirmation: [],
  });

  const handleRegister = async () => {
    try {
      const response = await onRegister!(
        name,
        username,
        email,
        password,
        passwordConfirmation
      );
      if (response && response.errors) {
        setErrors(response.errors);
      } else {
        router.push("/(onboard)/welcome");
      }
    } catch (error) {
      setErrors(null as any); // Set generic error message
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Registrasi"
          desc="Silahkan lakukkan registrasi untuk melanjutkan."
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
          <FormInput
            placeholder={"Name"}
            onChangeText={(text) => setName(text)}
            value={name}
            type="default"
            errors={errors?.name}
          />
          <FormInput
            placeholder={"Username"}
            onChangeText={(text) => setUsername(text)}
            value={username}
            type="default"
            errors={errors?.username}
          />
          <FormInput
            placeholder={"Email"}
            onChangeText={(text) => setEmail(text)}
            value={email}
            type="email-address"
            errors={errors?.email}
          />
          <FormInput
            placeholder={"Password"}
            onChangeText={(text) => setPassword(text)}
            value={password}
            type="password"
            secureTextEntry={true}
            errors={errors?.username}
          />
          <FormInput
            placeholder={"Konfirmasi Password"}
            onChangeText={(text) => setPasswordConfirmation(text)}
            value={passwordConfirmation}
            type="password"
            secureTextEntry={true}
            errors={errors?.username}
          />
          <PrimaryButton onPress={handleRegister} title="Registrasi" />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 14,
            }}
          >
            <Text>Sudah punya akun?</Text>
            <Pressable>
              <Link href={"(auth)/login"} asChild>
                <Text style={{ textDecorationStyle: "dashed", textDecorationLine: "underline" }}>Masuk</Text>
              </Link>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
