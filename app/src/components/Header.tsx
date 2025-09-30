import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Text, View } from "react-native";
import { faCamera, faBars } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Header() {
    return (
        <View className="h-auto w-full bg-sand-400 flex-row items-center px-4 py-4">
            <View className="flex-1">
                <Text className="text-black text-2xl font-EncodeSansCondensedExtraBold tracking-wider">LinkUp</Text>
            </View>

            <FontAwesomeIcon icon={faCamera as IconProp} color="#000000" size={24} style={{ marginRight: 25 }} />

            <FontAwesomeIcon icon={faBars as IconProp} color="#000000" size={24} />
        </View>
    );
}