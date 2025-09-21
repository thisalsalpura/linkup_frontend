import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
    return (
        <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
            <View className="h-full w-full bg-white dark:bg-[#1C1C21] justify-center items-center p-4">
                <Text className="text-black dark:text-white">Home</Text>
            </View>
        </SafeAreaView>
    );
}