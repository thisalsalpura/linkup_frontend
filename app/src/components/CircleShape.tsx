import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

interface Circle {
    height: number;
    width: number;
    fillColor: string;
    borderRadius: number;
    topValue?: number;
    rightValue?: number;
    bottomValue?: number;
    leftValue?: number;
}

export default function CircleShape(c: Circle) {

    const translate = useSharedValue(0);

    useEffect(() => {
        translate.value = withRepeat(
            withSequence(
                withTiming(20, { duration: 2000 }),
                withTiming(0, { duration: 2000 })
            ),
            -1,
            true
        );
    }, []);

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translate.value }],
        };
    });

    return (
        <Animated.View
            className="absolute"
            style={[
                {
                    width: c.width,
                    height: c.height,
                    backgroundColor: c.fillColor,
                    borderRadius: c.borderRadius,
                    ...(c.topValue !== undefined && { top: c.topValue }),
                    ...(c.rightValue !== undefined && { right: c.rightValue }),
                    ...(c.bottomValue !== undefined && { bottom: c.bottomValue }),
                    ...(c.leftValue !== undefined && { left: c.leftValue })
                },
                animationStyle
            ]}>
        </Animated.View>
    );
}