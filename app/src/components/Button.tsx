import React from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

type ButtonProps = {
    name: string;
    onPress?: (event: GestureResponderEvent) => void;
    containerClass: string;
    textClass: string;
}

export default function Button(button: ButtonProps) {

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
                <Animated.View style={animationStyle} className="btn-ping"></Animated.View>
                <View className="btn-ping_dot"></View>
            </View>
            <Text className={`text-xl text-center font-EncodeSansCondensedBold tracking-wide ${button.textClass}`}>{button.name}</Text>
        </Pressable>
    );
}