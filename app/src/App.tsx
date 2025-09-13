import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./global.css";

export default function App() {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-5xl text-black font-bold">Welcome!</Text>
      <StatusBar style="auto" />
    </View>
  );
}