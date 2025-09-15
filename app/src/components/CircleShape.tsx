import React from "react";
import { Animated } from "react-native";

interface Circle {
    height: number;
    width: number;
    fillColor: string;
    borderRadius: number;
    topValue?: number;
    rightValue?: number;
    bottomValue?: number;
    leftValue?: number;
    animatedStyle?: any;
}

export default function CircleShape({ height, width, fillColor, borderRadius, topValue, rightValue, bottomValue, leftValue, animatedStyle }: Circle) {
    return (
        <Animated.View className="absolute" style={[
            {
                width: width,
                height: height,
                backgroundColor: fillColor,
                borderRadius: borderRadius,
                ...(topValue !== undefined && { top: topValue }),
                ...(rightValue !== undefined && { right: rightValue }),
                ...(bottomValue !== undefined && { bottom: bottomValue }),
                ...(leftValue !== undefined && { left: leftValue })
            },
            animatedStyle
        ]}></Animated.View>
    );
}