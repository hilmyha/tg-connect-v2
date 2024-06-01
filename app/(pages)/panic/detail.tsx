import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getPanicById } from "../../../services/PanicService";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

type Location = {
  latitude: string;
  longitude: string;
  created_at: string;
  user_id: number;
};

const INITIAL_REGION = {
  latitude: -7.712584440749788,
  longitude: 109.02972699869707,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await getPanicById(id);
        console.log("response", response.data);
        setLocation(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (location) {
      animateToLocation(location);
    }
  }, [location]);

  const animateToLocation = (location: Location) => {
    if (mapRef.current) {
      const { latitude, longitude } = location;
      mapRef.current.animateToRegion({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#405B6A" />
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsMyLocationButton={true}
        showsCompass={true}
        showsUserLocation={true}
        onRegionChange={() => {}} // disable region change
        ref={mapRef}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: parseFloat(location?.latitude),
              longitude: parseFloat(location?.longitude),
            }}
            title={`User ID: ${location?.user_id}`}
            description="Lokasi kejadian"
          />
        )}
      </MapView>

      <View style={{ position: "absolute", top: 12, left: 12 }}>
        <View
          style={{ backgroundColor: "#4E6E81", padding: 8, borderRadius: 14 }}
        >
          <Pressable onPress={router.back}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
  },
});
