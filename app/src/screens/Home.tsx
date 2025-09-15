import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <SafeAreaView className="flex-1 bg-sand-300" edges={["top", "bottom"]}>
            <View className="h-full w-full bg-sand-200 justify-center items-center p-4">
                <Text>Home</Text>
            </View>
        </SafeAreaView>
    );
}