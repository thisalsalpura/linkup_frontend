import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useFriendList } from "../web_socket/services/UseFriendList";
import { Chat } from "../web_socket/Chat.Interfaces";
import Loader from "../components/Loader";

type NavigationProps = NativeStackNavigationProp<RootParamList, "FriendContacts">;

export default function FriendContacts() {

    const navigator = useNavigation<NavigationProps>();

    const { applied } = useTheme();

    const [searchText, setSearchText] = useState('');

    const { friendList, loading } = useFriendList();

    const filteredFriends = friendList.filter((friend) => {
        return (
            friend.friendFname.toLowerCase().includes(searchText.toLowerCase()) || friend.friendLname.toLowerCase().includes(searchText.toLowerCase())
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
            <View className="h-auto w-full flex flex-row justify-start items-center p-2.5 gap-5">
                <View className="h-16 w-16 border border-black dark:border-white flex justify-center items-center p-0.5 rounded-full overflow-hidden flex-shrink-0">
                    {item.profileImage ? (
                        <Image source={{ uri: item.profileImage }} className="h-full w-full rounded-full" resizeMode="cover" />
                    ) : (
                        <View className="h-full w-full bg-sand-400 flex justify-center items-center rounded-full">
                            <Text className="text-2xl text-center text-black font-EncodeSansCondensedBold tracking-widest">{item.friendFname[0]}{item.friendLname[0]}</Text>
                        </View>
                    )}
                </View>

                <View className="flex flex-col justify-center items-center gap-2">
                    <Text className="text-xl text-left text-black dark:text-white font-EncodeSansCondensedSemiBold" numberOfLines={1} ellipsizeMode="tail">{item.friendFname + " " + item.friendLname} </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
            {loading && (
                <View className="absolute inset-0 bg-blur loading-bg-blur justify-center items-center z-50">
                    <Loader />
                </View>
            )}

            <View className="h-auto w-full bg-sand-400 flex flex-row justify-center items-center px-4 py-4 gap-6">
                <View className="flex-1 flex justify-center items-center">
                    <TextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        className="h-[50px] w-full bg-sand-400 text-start text-black font-EncodeSansCondensedMedium border-2 border-black rounded-[10px] px-[10px]"
                    />
                </View>

                <TouchableOpacity className="h-[50px] w-[50px] flex justify-center items-center border-2 border-black rounded-[10px]">
                    <FontAwesomeIcon icon={faPlus as IconProp} color="#000000" size={20} />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                <KeyboardAwareFlatList className="flex-1 bg-white dark:bg-[#1C1C21] px-6 py-6" data={filteredFriends} contentContainerStyle={{ gap: 8, paddingBottom: 40 }} showsVerticalScrollIndicator={false} extraScrollHeight={20} enableOnAndroid={true} keyboardShouldPersistTaps="handled" enableAutomaticScroll={true}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <TouchableOpacity className="h-auto w-full bg-blur justify-center items-center rounded-2xl p-6" style={{ backgroundColor: applied === "dark" ? "#ffffff1a" : "#0000001a" }}>
                            <Text className="text-xl text-center text-black dark:text-white font-EncodeSansCondensedMedium">You didn't have contact with anyone Yet!</Text>
                        </TouchableOpacity>
                    }
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}