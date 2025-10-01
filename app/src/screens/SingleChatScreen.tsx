import React, { useState } from "react";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

export default function SingleChatScreen() {

    const { applied } = useTheme();

    const [chatText, setChatText] = useState('');

    const messages = [
        {
            id: 1,
            text: "Hi",
            sender: "friend",
            time: "10:56 AM"
        },

        {
            id: 2,
            text: "Hi, hello",
            sender: "friend",
            time: "10.57 AM"
        },

        {
            id: 3,
            text: "Hello, Kohomathe",
            sender: "me",
            time: "10.58 AM",
            status: "read"
        }
    ];

    const renderItem = ({ item }: any) => (
        <TouchableOpacity className="flex flex-row self-start justify-center items-center">
            <View className="h-auto w-auto max-w-[50%] flex justify-center items-start bg-black dark:bg-white p-4 rounded-lg">
                <View className="h-auto w-auto flex flex-wrap justify-center items-center">
                    <Text className="text-lg text-white dark:text-black font-EncodeSansCondensedMedium tracking-wide">{item.text}</Text>
                </View>
            </View>

            <View className="h-0 w-0 border-t-[8px] border-b-[8px] border-l-[8px] border-r-0 border-t-transparent border-b-transparent border-l-black dark:border-l-white border-r-transparent mt-[10px] -mr-[10px]" />
        </TouchableOpacity>
    );

    return (
        <AlertNotificationRoot
            theme={applied === "dark" ? "light" : "dark"}
            toastConfig={{
                titleStyle: { fontFamily: "EncodeSansCondensedBold", fontSize: 18 },
                textBodyStyle: { fontFamily: "EncodeSansCondensedMedium", fontSize: 14 },
            }}
        >
            <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
                <View className="h-auto w-full bg-sand-400 flex flex-row justify-center items-center px-4 py-4 gap-6">
                    <View className="h-12 w-12 flex justify-center items-center border border-black rounded-full p-0.5 flex-shrink-0">

                    </View>

                    <View className="flex-1 h-auto w-auto flex justify-center items-start">
                        <Text className="text-xl text-left text-black font-EncodeSansCondensedBold" numberOfLines={1} ellipsizeMode="tail">Sahan Perera</Text>
                    </View>
                </View>

                <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                    <KeyboardAwareFlatList className="flex-1 bg-white dark:bg-[#1C1C21] px-6 py-6" data={messages} contentContainerStyle={{ gap: 10, paddingBottom: 40 }} showsVerticalScrollIndicator={false} extraScrollHeight={20} enableOnAndroid={true} keyboardShouldPersistTaps="handled" enableAutomaticScroll={true}
                        renderItem={renderItem}
                        ListEmptyComponent={
                            <View></View>
                        }
                    />

                    <View className="bottom-0 h-auto w-full bg-white dark:bg-[#1C1C21] flex flex-row justify-center items-center px-4 py-4 gap-6 border-t-2 border-sand-400">
                        <View className="flex-1 flex justify-center items-center">
                            <TextInput
                                value={chatText}
                                onChangeText={setChatText}
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

                        <View className="h-[50px] w-[50px] flex justify-center items-center bg-sand-400 border border-sand-400 rounded-2xl">
                            <FontAwesomeIcon icon={faSquareArrowUpRight as IconProp} color="#000000" size={24} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </AlertNotificationRoot>
    );
}