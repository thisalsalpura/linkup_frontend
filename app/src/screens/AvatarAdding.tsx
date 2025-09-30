import React, { useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SvgUri } from "react-native-svg";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useTheme } from "../theme/ThemeProvider";
import Button from "../components/Button";
import { RootParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../hooks/UserContext";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { validateProfileImage } from "../util/Validation";
import { createNewAccount } from "../api/CreateNewAccount";
import Loader from "../components/Loader";

type NavigationProps = NativeStackNavigationProp<RootParamList, "AvatarAdding">;

export default function AvatarAdding() {

    const navigator = useNavigation<NavigationProps>();

    const { applied } = useTheme();

    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setUserData((previous) => ({
                ...previous,
                profileImage: result.assets[0].uri
            }));
        }
    }

    const avatars = [
        require("../../../assets/images/avatars/Avatar-01.png"),
        require("../../../assets/images/avatars/Avatar-02.png"),
        require("../../../assets/images/avatars/Avatar-03.png"),
        require("../../../assets/images/avatars/Avatar-04.png"),
        require("../../../assets/images/avatars/Avatar-05.png"),
        require("../../../assets/images/avatars/Avatar-06.png"),
        require("../../../assets/images/avatars/Avatar-07.png"),
        require("../../../assets/images/avatars/Avatar-08.png"),
        require("../../../assets/images/avatars/Avatar-09.png"),
        require("../../../assets/images/avatars/Avatar-10.png"),
        require("../../../assets/images/avatars/Avatar-11.png"),
        require("../../../assets/images/avatars/Avatar-12.png"),
    ];

    const { userData, setUserData } = useUserRegistration();

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

                <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                    <KeyboardAwareScrollView className="flex-1 bg-white dark:bg-[#1C1C21]" contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false} extraScrollHeight={20} enableOnAndroid={true} keyboardShouldPersistTaps="handled" enableAutomaticScroll={true}>
                        <View className="flex-1 w-full justify-start items-center px-8 py-12">
                            <View className="h-auto w-full flex flex-col justify-center items-center gap-8">
                                <SvgUri height={100} uri={"https://raw.githubusercontent.com/thisalsalpura/linkup_frontend/master/assets/icons/logo.svg"} />
                                <Text className="text-black dark:text-white text-2xl font-EncodeSansCondensedBold tracking-wider">LinkUp</Text>
                            </View>

                            <View className="mt-10 h-auto w-full flex justify-center items-center">
                                <Text className="text-black dark:text-white text-lg font-EncodeSansCondensedMedium tracking-widest">Let's add Profile Image!</Text>
                            </View>

                            <View className="mt-10 h-auto w-full flex justify-center items-start">
                                <View className="h-auto w-auto bg-sand-400 rounded-full px-4 py-2">
                                    <Text className="text-black text-lg font-EncodeSansCondensedMedium tracking-widest">Step 4</Text>
                                </View>
                            </View>

                            <View className="mt-10 h-auto w-full flex flex-row justify-center items-center">
                                <Pressable className="h-44 w-44 bg-black dark:bg-white justify-center items-center border-2 border-gray-400 border-dashed overflow-hidden rounded-full p-1">
                                    {image ? (
                                        <Image source={{ uri: image }} className="h-full w-full rounded-full" resizeMode="cover" />
                                    ) : (
                                        <SvgUri height="70%" width="70%" uri={"https://raw.githubusercontent.com/thisalsalpura/linkup_frontend/master/assets/images/user.svg"} />
                                    )}
                                </Pressable>
                            </View>

                            <View className="mt-10 h-auto w-full flex justify-center items-center">
                                <Pressable className="h-auto w-full bg-black dark:bg-white flex flex-col justify-center items-center border-2 border-gray-400 border-dashed rounded-[10px] p-5 gap-4" onPress={pickImage}>
                                    <FontAwesomeIcon icon={faCamera as IconProp} color={applied === "dark" ? "#000000" : "#FFFFFF"} size={34} />
                                    <Text className="text-white dark:text-black text-lg font-EncodeSansCondensedMedium tracking-widest">Choose a Profile Picture</Text>
                                </Pressable>
                            </View>

                            <View className="mt-10 h-auto w-full flex justify-center items-center">
                                <Text className="text-black dark:text-white text-lg font-EncodeSansCondensedMedium tracking-widest">Or you can choose a Avatar!</Text>
                            </View>

                            <View className="mt-10 h-auto w-full flex justify-center items-center">
                                <FlatList
                                    data={avatars}
                                    horizontal
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            className="h-28 w-28 mx-2 bg-black dark:bg-white justify-center items-center border-2 border-gray-400 overflow-hidden rounded-full p-1"
                                            onPress={() => {
                                                setImage(Image.resolveAssetSource(item).uri);
                                                setUserData((previous) => ({
                                                    ...previous,
                                                    profileImage: Image.resolveAssetSource(item).uri
                                                }));
                                            }}
                                        >
                                            <Image source={item} className="h-full w-full rounded-full" resizeMode="cover" />
                                        </TouchableOpacity>
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>

                            <View className="mt-16 h-auto w-full flex flex-col justify-center items-center gap-8">
                                <Pressable
                                    className="h-auto w-auto bg-sand-400 rounded-full px-6 py-3"
                                    onPress={async () => {
                                        try {
                                            setLoading(true);

                                            const response = await createNewAccount(userData, "WITHOUT_PROFILE_IMG");

                                            if (response.status) {
                                                Toast.show({
                                                    type: ALERT_TYPE.SUCCESS,
                                                    title: 'Success',
                                                    textBody: response.message,
                                                });

                                                setTimeout(() => {
                                                    navigator.replace("Home");
                                                }, 2000);
                                            } else {
                                                Toast.show({
                                                    type: ALERT_TYPE.WARNING,
                                                    title: 'Warning',
                                                    textBody: response.message,
                                                });
                                            }
                                        } catch (error) {
                                            console.error(error);
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                >
                                    <Text className="text-black text-lg font-EncodeSansCondensedBold tracking-widest">Skip for Now</Text>
                                </Pressable>
                                <Button
                                    name="Next"
                                    onPress={async () => {
                                        const validProfileImage = validateProfileImage(
                                            userData.profileImage
                                                ? { uri: userData.profileImage, type: "", fileSize: 0 }
                                                : null
                                        );

                                        if (validProfileImage) {
                                            Toast.show({
                                                type: ALERT_TYPE.WARNING,
                                                title: 'Warning',
                                                textBody: validProfileImage,
                                            });
                                        } else {
                                            try {
                                                setLoading(true);

                                                const response = await createNewAccount(userData, "WITH_PROFILE_IMG");

                                                if (response.status) {
                                                    Toast.show({
                                                        type: ALERT_TYPE.SUCCESS,
                                                        title: 'Success',
                                                        textBody: response.message,
                                                    });

                                                    setTimeout(() => {
                                                        navigator.replace("Home");
                                                    }, 2000);
                                                } else {
                                                    Toast.show({
                                                        type: ALERT_TYPE.WARNING,
                                                        title: 'Warning',
                                                        textBody: response.message,
                                                    });
                                                }
                                            } catch (error) {
                                                console.error(error);
                                            } finally {
                                                setLoading(false);
                                            }
                                        }
                                    }}
                                    containerClass="bg-black dark:bg-white border-2 border-black dark:border-white"
                                    textClass="text-white dark:text-black"
                                    showIcon={true}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </KeyboardAvoidingView>

                <StatusBar hidden={true} />
            </SafeAreaView>
        </AlertNotificationRoot>
    );
}