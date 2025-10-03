import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { RootParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useFriendList } from "../web_socket/services/UseFriendList";
import { Chat } from "../web_socket/Chat.Interfaces";
import Loader from "../components/Loader";
import { TextInput } from "react-native-paper";
import Modal from 'react-native-modal';
import Button from "../components/Button";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { useAddNewContact } from "../web_socket/services/UseAddContact";
import { validateCountryCode, validateMobile } from "../util/Validation";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { StatusBar } from "expo-status-bar";

type NavigationProps = NativeStackNavigationProp<RootParamList, "FriendContacts">;

export default function FriendContacts() {

    const navigator = useNavigation<NavigationProps>();

    const { applied } = useTheme();

    const insets = useSafeAreaInsets();

    const [searchText, setSearchText] = useState('');

    const { friendList, setFriendList, loading: friendListLoading } = useFriendList();

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

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [callingCode, setCallingCode] = useState("+94");

    const [mobile, setMobile] = useState('');

    const [show, setShow] = useState<boolean>(false);

    const [countryCode, setCountryCode] = useState<CountryCode>("LK");

    const [country, setCountry] = useState<Country | null>(null);

    const { addNewContact, loading: addNewContactLoading } = useAddNewContact(setFriendList, setModalVisible);

    return (
        <AlertNotificationRoot
            theme={applied === "dark" ? "light" : "dark"}
            toastConfig={{
                titleStyle: { fontFamily: "EncodeSansCondensedBold", fontSize: 18 },
                textBodyStyle: { fontFamily: "EncodeSansCondensedMedium", fontSize: 14 },
            }}
        >
            <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
                {(friendListLoading || addNewContactLoading) && (
                    <View className="absolute inset-0 bg-blur loading-bg-blur justify-center items-center z-50">
                        <Loader />
                    </View>
                )}

                <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                    <KeyboardAwareFlatList className="flex-1 bg-white dark:bg-[#1C1C21] px-6 py-6" data={filteredFriends} contentContainerStyle={{ gap: 8, paddingBottom: 40 }} showsVerticalScrollIndicator={false} extraScrollHeight={20} enableOnAndroid={true} keyboardShouldPersistTaps="handled" enableAutomaticScroll={true}
                        ListHeaderComponent={
                            <View className="mb-5 h-auto w-full flex justify-start items-center">
                                <View className="h-auto w-full flex justify-center items-center">
                                    <TextInput
                                        label="Search by Name"
                                        value={searchText}
                                        onChangeText={setSearchText}
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
                                <Text className="text-xl text-center text-black dark:text-white font-EncodeSansCondensedMedium">You didn't have contact with anyone Yet!</Text>
                            </TouchableOpacity>
                        }
                    />
                </KeyboardAvoidingView>

                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    avoidKeyboard={true}
                    backdropOpacity={0}
                    backdropColor="#ffffff70"
                    style={{ justifyContent: "flex-end", margin: 0 }}
                >
                    <View className="min-h-auto max-h-[50%] flex justify-start items-start bg-black dark:bg-white border-2 border-black dark:border-white rounded-tl-xl rounded-tr-xl p-6 gap-6">
                        <View className="h-auto w-full flex justify-center items-start">
                            <Text className="text-xl text-white dark:text-black font-EncodeSansCondensedBold">Add new Contact</Text>
                        </View>

                        <View className="h-[50px] w-full bg-white dark:bg-black flex flex-row justify-center items-center border-2 border-white dark:border-black rounded-[10px]">
                            <CountryPicker
                                countryCode={countryCode}
                                withFilter
                                withFlag
                                withCountryNameButton
                                withCallingCode
                                visible={show}
                                onClose={() => setShow(false)}
                                onSelect={(c) => {
                                    setCountryCode(c.cca2);
                                    setCountry(c);
                                    setShow(false);
                                }}
                                theme={{
                                    backgroundColor: applied === "dark" ? "#1C1C21" : "#FFFFFF",
                                    onBackgroundTextColor: applied === "dark" ? "#FFFFFF" : "#000000",
                                    fontFamily: "EncodeSansCondensedBold",
                                }}
                            />
                        </View>

                        <View className="h-auto w-full flex flex-row justify-center items-start gap-2">
                            <View className="h-auto w-[30%] flex justify-center items-center">
                                <TextInput
                                    label="Contry Code"
                                    value={country ? `+${country.callingCode}` : callingCode}
                                    editable={false}
                                    mode="outlined"
                                    textColor={applied === "dark" ? "#000000" : "#FFFFFF"}
                                    outlineColor="#E3D5CA"
                                    activeOutlineColor="#D5BDAF"
                                    keyboardType="phone-pad"
                                    style={{ height: 50, width: "100%", backgroundColor: applied === "dark" ? "#FFFFFF" : "#000000" }}
                                    theme={{
                                        colors: {
                                            placeholder: "#E3D5CA",
                                            primary: "#D5BDAF"
                                        }
                                    }}
                                />
                            </View>

                            <View className="h-auto w-[70%] flex justify-center items-center">
                                <TextInput
                                    label="Mobile Number"
                                    value={mobile}
                                    onChangeText={setMobile}
                                    mode="outlined"
                                    textColor={applied === "dark" ? "#000000" : "#FFFFFF"}
                                    outlineColor="#E3D5CA"
                                    activeOutlineColor="#D5BDAF"
                                    keyboardType="phone-pad"
                                    style={{ height: 50, width: "100%", backgroundColor: applied === "dark" ? "#FFFFFF" : "#000000" }}
                                    theme={{
                                        colors: {
                                            placeholder: "#E3D5CA",
                                            primary: "#D5BDAF"
                                        }
                                    }}
                                />
                            </View>
                        </View>

                        <View className="h-auto w-full flex justify-center items-center">
                            <Button
                                name="Add"
                                onPress={() => {
                                    const validCountryCode = validateCountryCode(country ? `+${country.callingCode}` : callingCode);
                                    const validMobile = validateMobile(mobile);

                                    if (validCountryCode) {
                                        Toast.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: 'Warning',
                                            textBody: validCountryCode,
                                        });
                                    } else if (validMobile) {
                                        Toast.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: 'Warning',
                                            textBody: validMobile,
                                        });
                                    } else {
                                        addNewContact({
                                            countryCode: country ? `+${country.callingCode}` : callingCode,
                                            mobile: mobile
                                        });

                                        setMobile('');
                                    }
                                }}
                                containerClass="bg-white dark:bg-black border-2 border-white dark:border-black"
                                textClass="text-black dark:text-white"
                                showIcon={false}
                            />
                        </View>
                    </View>
                </Modal>


                <View style={{
                    position: "absolute",
                    right: 16,
                    bottom: insets.bottom + 16
                }}>
                    <TouchableOpacity className="h-16 w-16 bg-sand-400 border-2 border-sand-400 rounded-2xl flex justify-center items-center" onPress={toggleModal}>
                        <FontAwesomeIcon icon={faPlus as IconProp} color="#000000" size={24} />
                    </TouchableOpacity>
                </View>

                <StatusBar hidden={true} />
            </SafeAreaView>
        </AlertNotificationRoot>
    );
}