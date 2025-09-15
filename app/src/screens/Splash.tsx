import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animated, Easing, View } from "react-native";
import { SvgUri } from "react-native-svg";
import CircleShape from "../components/CircleShape";
import * as Progress from "react-native-progress";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = NativeStackNavigationProp<RootParamList>;

export default function Splash() {

    const navigator = useNavigation<NavigationProps>();

    const [progress, setProgress] = useState(0);

    const moveLeftX = useRef(new Animated.Value(0)).current;
    const moveLeftY = useRef(new Animated.Value(0)).current;
    const moveRightX = useRef(new Animated.Value(0)).current;
    const moveRightY = useRef(new Animated.Value(0)).current;

    const loopFloat = (
        animatedValue: Animated.Value,
        range: number,
        duration: number,
        delay = 0
    ) => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: range,
                    duration,
                    delay,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: -range,
                    duration,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    useEffect(() => {
        loopFloat(moveLeftX, 20, 3000);
        loopFloat(moveLeftY, 15, 3500, 400);
        loopFloat(moveRightX, 20, 3200);
        loopFloat(moveRightY, 25, 3600, 600);
    }, []);

    useEffect(() => {
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 1) {
                    clearInterval(interval);
                    return 1;
                }
                return prev + 0.02;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 1) {
            navigator.navigate("Home");
        }
    }, [progress, navigator]);


    return (
        <SafeAreaView className="flex-1 bg-sand-300" edges={["top", "bottom"]}>
            <View className="h-full w-full bg-sand-200 justify-center items-center p-4">
                <CircleShape height={200} width={200} fillColor="#D5BDAF" borderRadius={999} topValue={-65} leftValue={-75} animatedStyle={{ transform: [{ translateX: moveLeftX }, { translateY: moveLeftY }] }} />
                <CircleShape height={150} width={150} fillColor="#D5BDAF" borderRadius={999} topValue={-125} leftValue={20} animatedStyle={{ transform: [{ translateX: moveRightX }, { translateY: moveRightY }] }} />
                <SvgUri height={180} uri={"https://raw.githubusercontent.com/thisalsalpura/linkup_frontend/master/assets/icons/logo.svg"} />
                <Progress.Bar
                    className="mt-12"
                    progress={progress}
                    width={180}
                    height={10}
                    color="#1F2937"
                    borderRadius={2}
                    borderWidth={0}
                    unfilledColor="#FFFFFF"
                    animated={true}
                />
                <CircleShape height={200} width={200} fillColor="#D5BDAF" borderRadius={999} bottomValue={-65} rightValue={-75} animatedStyle={{ transform: [{ translateX: moveLeftX }, { translateY: moveLeftY }] }} />
                <CircleShape height={150} width={150} fillColor="#D5BDAF" borderRadius={999} bottomValue={-125} rightValue={20} animatedStyle={{ transform: [{ translateX: moveRightX }, { translateY: moveRightY }] }} />
            </View>
            <StatusBar hidden={true} />
        </SafeAreaView>
    );
}