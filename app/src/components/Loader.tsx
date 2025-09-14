import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import LoadingDots from "react-native-loading-dots";

export default function Loader() {
    return (
        <SafeAreaView className="flex-1 bg-sand-300" edges={["top", "bottom"]}>
            <View className="h-full w-full bg-sand-200 justify-center items-center">
                <LoadingDots
                    dots={4}
                    colors={['#EDEDE9', '#D6CCC2', '#E3D5CA', '#D5BDAF']}
                    size={25}
                    bounceHeight={5}
                    animationType="spring"
                    animationOptions={{ tension: 150, friction: 7 }}
                />
            </View>
        </SafeAreaView>
    );
}