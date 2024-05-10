import {
  View,
  Text,
  TextInputProps,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  placeholder: string;
  secureTextEntry?: boolean;
  type?: TextInputProps["keyboardType"] | "password";
  onChangeText?: TextInputProps["onChangeText"];
  value?: string;
  errors?: [];
  editable?: boolean;
};

export default function FormInput({
  placeholder,
  errors = [],
  ...rest
}: Props) {
  const [isHidden, setIsHidden] = useState(true);
  const [iconName, setIconName] = useState("eye-off");

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 10,
    },
    textInput: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 12,
      color: "#9E9C98",
    },
    text: {
      color: "#9E9C98",
      fontSize: 14,
    },
    texterror: {
      color: "red",
      fontSize: 12,
      marginTop: 2,
    },
  });

  return (
    <View>
      <View style={styles.container}>
        {rest.type === "phone-pad" && (
          <View
            style={{
              paddingHorizontal: 16,
              borderRightWidth: 1,
              borderRightColor: "gray",
            }}
          >
            <Text style={styles.text}>+62</Text>
          </View>
        )}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          autoCapitalize="none"
          {...rest}
          secureTextEntry={rest.type === "password" && isHidden}
          keyboardType={rest.type === "password" ? "default" : rest.type}
        />
        {rest.type === "password" && (
          <Pressable
            onPress={() => {
              setIsHidden(!isHidden);
              setIconName(isHidden ? "eye" : "eye-off");
            }}
            style={{ marginRight: 16 }}
          >
            <Ionicons name={iconName} size={24} color="#9E9C98" />
          </Pressable>
        )}
      </View>
      {errors.map((err) => (
        <Text key={err} style={styles.texterror}>
          {err}
        </Text>
      ))}
    </View>
  );
}
