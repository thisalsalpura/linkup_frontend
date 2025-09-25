import { Image, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleShape from "../components/CircleShape";
import { StatusBar } from "expo-status-bar";
import { SvgUri } from "react-native-svg";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faUser } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useTheme } from "../theme/ThemeProvider";

export default function AvatarAdding() {

    const { applied } = useTheme();

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
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
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
                            <Pressable className="relative h-44 w-44 bg-[#1C1C21] dark:bg-white justify-center items-center border-2 border-gray-400 border-dashed rounded-full p-1">
                                {image ? (
                                    <Image source={{ uri: image }} className="h-full w-full rounded-full" />
                                ) : (
                                    <SvgUri className="h-full w-full" uri={"https://raw.githubusercontent.com/thisalsalpura/linkup_frontend/master/assets/images/user.svg"} />
                                )}
                            </Pressable>
                        </View>

                        <View className="mt-10 h-auto w-full flex justify-center items-center">
                            <Pressable className="h-auto w-full bg-[#1C1C21] dark:bg-white flex flex-col justify-center items-center border-2 border-gray-400 border-dashed rounded-[10px] p-5 gap-4" onPress={pickImage}>
                                <FontAwesomeIcon icon={faCamera as IconProp} color={applied === "dark" ? "#000000" : "#FFFFFF"} size={34} />
                                <Text className="text-white dark:text-black text-lg font-EncodeSansCondensedMedium tracking-widest">Choose a Profile Picture</Text>
                            </Pressable>
                        </View>

                        <View className="mt-10 h-auto w-full flex justify-center items-center">
                            <Text className="text-black dark:text-white text-lg font-EncodeSansCondensedMedium tracking-widest">Or you can choose a Avatar!</Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>

            {/* <CircleShape height={200} width={200} fillColor="#D5BDAF" borderRadius={999} bottomValue={-30} rightValue={-95} />
            <CircleShape height={150} width={150} fillColor="#D5BDAF" borderRadius={999} bottomValue={-40} rightValue={45} /> */}

            <StatusBar hidden={true} />
        </SafeAreaView>
    );
}