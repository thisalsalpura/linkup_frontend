import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import "../../src/global.css";
import { SvgUri } from "react-native-svg";

export default function Splash() {
    return (
        <SafeAreaView className="flex-1 bg-sand-300" edges={["top", "bottom"]}>
            <View className="h-full w-full bg-sand-200 justify-center items-center p-4">
                <SvgUri width={200} height={200} uri={"https://raw.githubusercontent.com/thisalsalpura/linkup_frontend/master/assets/icons/logo.svg"} />
            </View>
            <StatusBar hidden={true} />
        </SafeAreaView>
    );
}