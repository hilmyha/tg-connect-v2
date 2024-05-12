import {
  View,
  Text,
  Platform,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { createInformasi } from "../../../services/InformasiService";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/layout/Header";
import FormInput from "../../../components/form/FormInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import PrimaryButton from "../../../components/button/PrimaryButton";

export default function create() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [error, setError] = useState<string[]>([]);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();

        setTanggal(
          currentDate.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }
    } else {
      toggleDatePicker();
    }
  };

  const onChangeTime = (event: any, selectedTime: any) => {
    if (selectedTime) {
      const currentTime = selectedTime || date;
      setDate(currentTime);

      if (Platform.OS === "android") {
        toggleTimePicker();
        setWaktu(
          currentTime.toLocaleTimeString("id-ID", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    } else {
      toggleTimePicker();
    }
  };

  const handleCreateInformasi = async () => {
    console.log(judul, deskripsi, tanggal);

    // buatkan error handling jika ada field yang kosong tetapi masukkan ke dalam array error
    if (!judul || !deskripsi || !tanggal || !waktu) {
      setError(["Semua kolom harus diisi."]);
      return;
    }

    try {
      await createInformasi({
        judul,
        deskripsi,
        tanggal,
        waktu,
      });

      router.push("/(tabs)/informasi");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Buat Informasi" desc="" headerHide={false} />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            flex: 1,
            gap: 14,
          }}
        >
          <FormInput
            placeholder={"Judul Informasi"}
            onChangeText={(text) => setJudul(text)}
            value={judul}
            type="default"
            errors={error}
          />
          <FormInput
            placeholder={"Deskripsi"}
            onChangeText={(text) => setDeskripsi(text)}
            value={deskripsi}
            type="default"
            errors={error}
          />

          {showPicker && (
            <DateTimePicker value={date} mode="date" onChange={onChange} />
          )}
          <Pressable onPress={toggleDatePicker}>
            <FormInput
              placeholder={"Hari Tanggal"}
              onChangeText={setTanggal}
              value={tanggal}
              type="default"
              editable={false}
              errors={error}
            />
          </Pressable>

          {showTimePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              is24Hour={true}
              onChange={onChangeTime}
            />
          )}
          <Pressable onPress={toggleTimePicker}>
            <FormInput
              placeholder={"Waktu"}
              onChangeText={setWaktu}
              value={waktu}
              type="default"
              editable={false}
              errors={error}
            />
          </Pressable>

          <PrimaryButton title="Kirim" onPress={handleCreateInformasi} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
