import React from "react";
import LoadingDots from "react-native-loading-dots";
import { View } from "react-native";

export default function Loader() {
    return (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <LoadingDots
                dots={5}
                borderRadius={20}
                colors={['#D5BDAF', '#D6CCC2', '#E3D5CA', '#D5BDAF', "#D6CCC2"]}
                size={18}
                bounceHeight={5}
                animationType="spring"
                animationOptions={{ tension: 150, friction: 7 }}
            />
        </View>
    );
}