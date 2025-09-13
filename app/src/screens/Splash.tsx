import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { SvgUri } from "react-native-svg";
import CircleShape from "../components/CircleShape";
import "../../src/global.css";

export default function Splash() {
    return (
        <SafeAreaView className="flex-1 bg-sand-300" edges={["top", "bottom"]}>
            <View className="h-full w-full bg-sand-200 justify-center items-center p-4">
                <CircleShape height={200} width={200} fillColor="#D5BDAF" borderRadius={999} topValue={-65} leftValue={-75} />
                <CircleShape height={150} width={150} fillColor="#D5BDAF" borderRadius={999} topValue={-125} leftValue={20} />
                <SvgUri width={220} height={220} uri={"https://raw.githubusercontent.com/thisalsalpura/linkup_frontend/master/assets/icons/logo.svg"} />
                <CircleShape height={200} width={200} fillColor="#D5BDAF" borderRadius={999} bottomValue={-65} rightValue={-75} />
                <CircleShape height={150} width={150} fillColor="#D5BDAF" borderRadius={999} bottomValue={-125} rightValue={20} />
            </View>
            <StatusBar hidden={true} />
        </SafeAreaView>
    );
}