import React, { useCallback, useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { useTheme } from "../../theme/ThemeProvider";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { useChatList } from "../../web_socket/services/UseChatList";
import { formatDateTime } from "../../util/DateFormatter";
import Loader from "../../components/Loader";
import { Chat } from "../../web_socket/Chat.Interfaces";
import { useUpdateChatStatus } from "../../web_socket/services/UseUpdateChatStatus";
import { useWebSocket } from "../../web_socket/WebSocketProvider";
import { useWebSocketPing } from "../../web_socket/services/UseWebSocketPing";

type NavigationProps = NativeStackNavigationProp<RootParamList, "Home">;

export default function Chats() {

    const navigator = useNavigation<NavigationProps>();

    const { applied } = useTheme();

    const { chatList, loading, fetchChatList } = useChatList();

    const [search, setSearch] = useState('');

    const filteredChats = chatList.filter((chat) => {
        return (
            chat.friendFname.toLowerCase().includes(search.toLowerCase()) || chat.friendLname.toLowerCase().includes(search.toLowerCase())
        );
    });

    const renderItem = ({ item }: { item: Chat }) => (
        <TouchableOpacity className="h-auto w-full bg-blur justify-start items-center rounded-2xl" style={{ backgroundColor: applied === "dark" ? "#ffffff1a" : "#0000001a" }} onPress={() => {
            navigator.navigate("SingleChatScreen", {
                friendId: item.friendId,
                friendFname: item.friendFname,
                friendLname: item.friendLname,
                profileImage: item.profileImage
            });
        }}>
            <View className="h-auto w-full flex flex-row justify-between items-center p-2.5 gap-5">
                <View className="flex-1 flex flex-row justify-center items-center gap-5">
                    <View className="h-16 w-16 border border-black dark:border-white flex justify-center items-center p-0.5 rounded-full overflow-hidden flex-shrink-0">
                        {item.profileImage ? (
                            <Image source={{ uri: item.profileImage }} className="h-full w-full rounded-full" resizeMode="cover" />
                        ) : (
                            <View className="h-full w-full bg-sand-400 flex justify-center items-center rounded-full">
                                <Text className="text-2xl text-center text-black font-EncodeSansCondensedBold tracking-widest">{item.friendFname[0]}{item.friendLname[0]}</Text>
                            </View>
                        )}
                    </View>

                    <View className="flex-1 flex flex-col justify-center items-start gap-2">
                        <Text className="text-lg text-left text-black dark:text-white font-EncodeSansCondensedSemiBold" numberOfLines={1} ellipsizeMode="tail">{item.friendFname + " " + item.friendLname} </Text>
                        <Text className="text-left text-black dark:text-white font-EncodeSansCondensedMedium" numberOfLines={1} ellipsizeMode="tail">{item.lastMessage}</Text>
                    </View>
                </View>

                <View className="h-auto w-auto flex flex-col justify-center items-end gap-2 flex-shrink-0">
                    <Text className="text-right text-gray-400 font-EncodeSansCondensedMedium">{formatDateTime(item.lastMessageTimeStamp)}</Text>
                    <View className={`h-6 w-6 flex justify-center items-center ${item.unreadMessageCount > 0 ? 'bg-sand-300' : 'bg-transparent'} rounded-full`}>
                        {item.unreadMessageCount > 0 && (
                            <Text className="text-xs text-center text-black font-EncodeSansCondensedMedium">{item.unreadMessageCount}</Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const updateChatStatus = useUpdateChatStatus();

    const { isConnected } = useWebSocket();

    useWebSocketPing(60000);

    useEffect(() => {
        updateChatStatus();
    }, []);

    useEffect(() => {
        if (isConnected) {
            updateChatStatus();
        }
    }, [isConnected, updateChatStatus]);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchChatList();
        updateChatStatus();
        setRefreshing(false);
    }, [fetchChatList]);

    useFocusEffect(
        React.useCallback(() => {
            const refresh = async () => {
                await fetchChatList();
                updateChatStatus();
            };
            refresh();

            return () => { };
        }, [fetchChatList])
    );

    return (
        <>
            {loading && (
                <View className="absolute inset-0 bg-blur loading-bg-blur justify-center items-center z-50">
                    <Loader />
                </View>
            )}

            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                <KeyboardAwareFlatList className="flex-1 bg-white dark:bg-[#1C1C21] px-6 py-6" data={filteredChats} contentContainerStyle={{ gap: 8, paddingBottom: 40 }} showsVerticalScrollIndicator={false} extraScrollHeight={20} enableOnAndroid={true} keyboardShouldPersistTaps="handled" enableAutomaticScroll={true}
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
                        <TouchableOpacity className="h-auto w-full bg-blur justify-center items-center rounded-2xl p-6" style={{ backgroundColor: applied === "dark" ? "#ffffff1a" : "#0000001a" }}>
                            <Text className="text-xl text-center text-black dark:text-white font-EncodeSansCondensedMedium">You didn't chat with anyone Yet!</Text>
                        </TouchableOpacity>
                    }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            </KeyboardAvoidingView>

            <View className="absolute bottom-4 right-4 h-16 w-16 bg-sand-400 border-2 border-sand-400 rounded-2xl">
                <TouchableOpacity className="h-full w-full flex justify-center items-center" onPress={() => navigator.navigate("FriendContacts")}>
                    <FontAwesomeIcon icon={faCalendarPlus as IconProp} color="#000000" size={24} />
                </TouchableOpacity>
            </View>
        </>
    );
}