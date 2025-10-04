import React, { useEffect, useRef, useState } from "react";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSquareArrowUpRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { SimpleRounded } from 'react-native-bubble-chat';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { useSendChat } from "../web_socket/services/UseSendChat";
import { useSingleChat } from "../web_socket/services/UseSingleChat";
import { Chat } from "../web_socket/Chat.Interfaces";
import { formatDateTime } from "../util/DateFormatter";
import Loader from "../components/Loader";
import { StatusBar } from "expo-status-bar";

type NavigationProps = NativeStackScreenProps<RootParamList, "SingleChatScreen">;

export default function SingleChatScreen({ route }: NavigationProps) {

    const navigator = useNavigation<NavigationProps>();

    const { friendId, friendFname, friendLname, profileImage } = route.params;

    const { applied } = useTheme();

    const flatListRef = useRef<any>(null);

    const { messages, loading } = useSingleChat(friendId);

    const [chatText, setChatText] = useState('');

    const sendMessage = useSendChat();

    const handlerSendChat = () => {
        if (!chatText || chatText.trim().length === 0) {
            return;
        }

        sendMessage(friendId, chatText);
        setChatText('');
    }

    const renderItem = ({ item }: { item: Chat }) => {
        const isMe = item.from.id !== friendId;

        return (
            <TouchableOpacity className={`h-auto w-auto max-w-[65%] ${isMe ? 'self-end' : 'self-start'}`}>
                <SimpleRounded
                    isSender={isMe ? true : false}
                    senderPoint="TOP"
                    recieverPoint="TOP"
                    backgroundColor={applied === "dark" ? "#FFFFFF" : "#000000"}
                    paddingHorizontal={15}
                    paddingVertical={12}
                >
                    <Text className="text-lg text-white dark:text-black font-EncodeSansCondensedMedium tracking-wide">{item.message}</Text>
                    <View className="mt-2.5 flex flex-row justify-between items-center gap-5">
                        <Text className="text-right text-gray-400 font-EncodeSansCondensedRegular">{formatDateTime(item.updatedAt)}</Text>
                        {isMe && (
                            <View className="flex flex-row justify-center items-center gap-1">
                                {item.status === "SENT" && (
                                    <FontAwesomeIcon icon={faCheck as IconProp} size={9} color="#9CA3AF" />
                                )}
                                {item.status === "DELIVERED" && (
                                    <>
                                        <FontAwesomeIcon icon={faCheck as IconProp} size={9} color="#9CA3AF" />
                                        <FontAwesomeIcon icon={faCheck as IconProp} size={9} color="#9CA3AF" />
                                    </>
                                )}
                                {item.status === "READ" && (
                                    <>
                                        <FontAwesomeIcon icon={faCheck as IconProp} size={9} color="#2563EB" />
                                        <FontAwesomeIcon icon={faCheck as IconProp} size={9} color="#2563EB" />
                                    </>
                                )}
                            </View>
                        )}
                    </View>
                </SimpleRounded>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        if (flatListRef.current && messages && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <AlertNotificationRoot
            theme={applied === "dark" ? "light" : "dark"}
            toastConfig={{
                titleStyle: { fontFamily: "EncodeSansCondensedBold", fontSize: 18 },
                textBodyStyle: { fontFamily: "EncodeSansCondensedMedium", fontSize: 14 },
            }}
        >
            <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
                {loading && (
                    <View className="absolute inset-0 bg-blur loading-bg-blur justify-center items-center z-50">
                        <Loader />
                    </View>
                )}

                <View className="h-auto w-full bg-sand-400 flex flex-row justify-center items-center px-4 py-4 gap-6">
                    <View className="h-12 w-12 flex justify-center items-center border border-black rounded-full p-0.5 flex-shrink-0">
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} className="h-full w-full rounded-full" resizeMode="cover" />
                        ) : (
                            <View className="h-full w-full bg-sand flex justify-center items-center rounded-full">
                                <Text className="text-xl text-center text-black font-EncodeSansCondensedBold tracking-widest">{friendFname[0]}{friendLname[0]}</Text>
                            </View>
                        )}
                    </View>

                    <View className="flex-1 h-auto w-auto flex justify-center items-start">
                        <Text className="text-xl text-left text-black font-EncodeSansCondensedBold" numberOfLines={1} ellipsizeMode="tail">{friendFname + " " + friendLname}</Text>
                    </View>
                </View>

                <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                    <KeyboardAwareFlatList className="flex-1 bg-white dark:bg-[#1C1C21] px-6 py-6" ref={flatListRef} data={messages} contentContainerStyle={{ gap: 10, paddingBottom: 40 }} showsVerticalScrollIndicator={false} extraScrollHeight={20} enableOnAndroid={true} keyboardShouldPersistTaps="handled" enableAutomaticScroll={true}
                        renderItem={renderItem}
                        ListEmptyComponent={
                            <View />
                        }
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    />

                    <View className="bottom-0 left-0 right-0 h-auto w-full bg-white dark:bg-[#1C1C21] flex flex-row justify-center items-center px-4 py-4 gap-6 border-t-2 border-b-2 border-t-sand-400 border-b-sand-400">
                        <View className="flex-1 justify-center items-center">
                            <TextInput
                                value={chatText}
                                onChangeText={setChatText}
                                multiline
                                className="min-h-[50px] max-h-[100px] w-full bg-white dark:bg-[#1C1C21] text-start text-black dark:text-white font-EncodeSansCondensedMedium border-2 border-[#E3D5CA] rounded-[10px] p-[10px]"
                            />
                        </View>

                        <TouchableOpacity className="h-[50px] w-[50px] flex justify-center items-center bg-sand-400 border-2 border-sand-400 rounded-2xl" onPress={handlerSendChat}>
                            <FontAwesomeIcon icon={faSquareArrowUpRight as IconProp} color="#000000" size={24} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                <StatusBar hidden={true} />
            </SafeAreaView>
        </AlertNotificationRoot>
    );
}