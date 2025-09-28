import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { SvgUri } from "react-native-svg";
import CircleShape from "../components/CircleShape";
import * as Progress from "react-native-progress";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "../theme/ThemeProvider";

type NavigationProps = NativeStackNavigationProp<RootParamList, "Splash">;

export default function Splash() {

    const navigator = useNavigation<NavigationProps>();

    const { applied } = useTheme();

    const [progress, setProgress] = useState(0);

    const opacity = useSharedValue(0);

    const hasNavigated = useRef(false);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 3000 });

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 1) {
                        clearInterval(interval);
                        return 1;
                    }
                    return prev + 0.02;
                });
            }, 50);

            return () => clearInterval(interval);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const fadeInAnimatedStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value };
    });

    useEffect(() => {
        if (progress >= 1 && !hasNavigated.current) {
            hasNavigated.current = true;
            navigator.replace("SignUp");
        }
    }, [progress, navigator]);

    return (
        <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
            <View className="h-full w-full bg-white dark:bg-[#1C1C21] justify-center items-center p-4">
                <CircleShape height={200} width={200} fillColor="#D5BDAF" borderRadius={999} topValue={-65} leftValue={-75} />
                <CircleShape height={150} width={150} fillColor="#D5BDAF" borderRadius={999} topValue={-125} leftValue={20} />

                <Animated.View style={fadeInAnimatedStyle} className="h-auto w-full flex flex-col justify-center items-center">
                    <SvgUri height={180} uri={"https://raw.githubusercontent.com/thisalsalpura/linkup_frontend/master/assets/icons/logo.svg"} />
                </Animated.View>

                <Animated.View style={fadeInAnimatedStyle} className="mt-12 h-auto w-full flex flex-col justify-center items-center">
                    <Progress.Bar
                        progress={progress}
                        width={180}
                        height={10}
                        color="#D5BDAF"
                        borderRadius={2}
                        borderWidth={0}
                        unfilledColor={applied === "dark" ? "#FFFFFF" : "#000000"}
                        animated={true}
                    />
                </Animated.View>

                <CircleShape height={200} width={200} fillColor="#D5BDAF" borderRadius={999} bottomValue={-65} rightValue={-75} />
                <CircleShape height={150} width={150} fillColor="#D5BDAF" borderRadius={999} bottomValue={-125} rightValue={20} />
            </View>
            <StatusBar hidden={true} />
        </SafeAreaView>
    );
}