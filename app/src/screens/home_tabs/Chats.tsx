import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";

type NavigationProps = NativeStackNavigationProp<RootParamList, "Home">;

const chats = [
    {
        id: 1,
        name: "Sahan Perera",
        lastMessage: "Hello, Kamal",
        time: "9:46 PM",
        unread: 2,
        profile: require("../../../../assets/images/avatars/Avatar-01.png")
    },

    {
        id: 2,
        name: "Amal Silva",
        lastMessage: "Hello, Amal",
        time: "Yesterday",
        unread: 8,
        profile: require("../../../../assets/images/avatars/Avatar-02.png")
    },

    {
        id: 3,
        name: "Hashen Soysa",
        lastMessage: "Hello, Hashen. If you're free today? I go to watch the SL VS AUS cricket match.",
        time: "2:32 pm",
        unread: 2,
        profile: require("../../../../assets/images/avatars/Avatar-03.png")
    },

    {
        id: 4,
        name: "Nayani De Silva",
        lastMessage: "Hello, Nayani",
        time: "2025/07/03",
        unread: 2,
        profile: require("../../../../assets/images/avatars/Avatar-04.png")
    },
];

export default function Chats() {

    const navigator = useNavigation<NavigationProps>();

    const { applied } = useTheme();

    const [search, setSearch] = useState('');

    const filteredChats = chats.filter((chat) => {
        return (
            chat.name.toLowerCase().includes(search.toLowerCase()) || chat.lastMessage.toLowerCase().includes(search.toLowerCase())
        );
    });

    const renderItem = ({ item }: any) => (
        <TouchableOpacity className="h-auto w-full bg-blur justify-start items-center rounded-2xl" style={{ backgroundColor: applied === "dark" ? "#ffffff1a" : "#0000001a" }}>
            <View className="h-auto w-full flex flex-row justify-between items-center p-2.5 gap-5">
                <View className="flex-1 flex flex-row justify-start items-center gap-5">
                    <View className="h-16 w-16 border border-black dark:border-white flex justify-center items-center p-0.5 rounded-full overflow-hidden flex-shrink-0">
                        <Image source={item.profile} className="h-full w-full rounded-full" resizeMode="cover" />
                    </View>

                    <View className="flex-1 flex flex-col justify-center items-start gap-2">
                        <Text className="text-lg text-left text-black dark:text-white font-EncodeSansCondensedSemiBold" numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                        <Text className="text-left text-black dark:text-white font-EncodeSansCondensedMedium" numberOfLines={1} ellipsizeMode="tail">{item.lastMessage}</Text>
                    </View>
                </View>

                <View className="h-auto w-auto flex flex-col justify-center items-end gap-2 flex-shrink-0">
                    <Text className="text-right text-gray-400 font-EncodeSansCondensedMedium">{item.time}</Text>
                    <View className="h-6 w-6 flex justify-center items-center bg-sand-300 rounded-full">
                        <Text className="text-xs text-center text-black font-EncodeSansCondensedMedium">{item.unread}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <Header />

            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                <KeyboardAwareFlatList className="flex-1 bg-white dark:bg-[#1C1C21] px-6 py-6" data={filteredChats} contentContainerStyle={{ gap: 8, paddingBottom: 40 }} showsVerticalScrollIndicator={false} extraScrollHeight={20} enableOnAndroid={true} keyboardShouldPersistTaps="handled"
                    ListHeaderComponent={
                        <View className="mb-5 h-auto w-full flex justify-start items-center">
                            <View className="h-auto w-full flex justify-center items-center">
                                <TextInput
                                    label="Search by Name"
                                    value={search}
                                    onChangeText={setSearch}
                                    mode="outlined"
                                    textColor={applied === "dark" ? "#FFFFFF" : "#000000"}
                                    outlineColor="#E3D5CA"
                                    activeOutlineColor="#D5BDAF"
                                    style={{ height: 50, width: "100%", backgroundColor: applied === "dark" ? "#1C1C21" : "#FFFFFF" }}
                                    theme={{
                                        colors: {
                                            placeholder: "#E3D5CA",
                                            primary: "#D5BDAF"
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    }
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <View />
                    }
                />
            </KeyboardAvoidingView>

            <View className="absolute bottom-4 right-4 h-16 w-16 bg-sand-400 rounded-2xl">
                <TouchableOpacity className="h-full w-full flex justify-center items-center">
                    <FontAwesomeIcon icon={faCalendarPlus as IconProp} color="#000000" size={22} />
                </TouchableOpacity>
            </View>
        </>
    );
}