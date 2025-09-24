import React from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useTheme } from "../theme/ThemeProvider";

type ButtonProps = {
    name: string;
    onPress?: (event: GestureResponderEvent) => void;
    containerClass: string;
    textClass: string;
    showIcon: boolean;
}

export default function Button(button: ButtonProps) {

    const { applied } = useTheme();

    const scale = useSharedValue(1);

    const opacity = useSharedValue(1);

    React.useEffect(() => {
        scale.value = withRepeat(withTiming(2, { duration: 1000 }), -1, true);
        opacity.value = withRepeat(withTiming(0, { duration: 1000 }), -1, true);
    }, []);

    const animationStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <Pressable onPress={button.onPress} className={`btn ${button.containerClass}`}>
            <View className="relative flex h-4 w-4 items-center rounded-full">
                <Animated.View style={animationStyle} className="btn-ping" />
                <View className="btn-ping_dot" />
            </View>
            <Text className={`text-xl text-center font-EncodeSansCondensedBold tracking-wide ${button.textClass}`}>{button.name}</Text>
            {button.showIcon && (
                <FontAwesomeIcon icon={faArrowRight as IconProp} color={applied === "dark" ? "#000000" : "#FFFFFF"} size={16} />
            )}
        </Pressable>
    );
}