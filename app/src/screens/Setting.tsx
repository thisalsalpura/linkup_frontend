import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeOption, useTheme } from "../theme/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import { SvgUri } from "react-native-svg";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { RootParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type NavigationProps = NativeStackNavigationProp<RootParamList, "Setting">;

const options: ThemeOption[] = ["light", "dark", "system"];

export default function Setting() {

    const navigator = useNavigation<NavigationProps>();

    const { preference, applied, setPreference } = useTheme();

    const radioButtons = useMemo<RadioButtonProps[]>(() => [
        {
            id: "light",
            label: "Light",
            value: "light"
        },
        {
            id: "dark",
            label: "Dark",
            value: "dark"
        },
        {
            id: "system",
            label: "System",
            value: "system"
        }
    ], [applied]);

    const [selectedId, setSelectedId] = useState(preference);

    return (
        <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                <KeyboardAwareScrollView className="flex-1 bg-white dark:bg-[#1C1C21]" contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false} extraScrollHeight={20} enableOnAndroid={true} keyboardShouldPersistTaps="handled" enableAutomaticScroll={true}>
                    <View className="flex-1 w-full justify-start items-center px-8 py-12">
                        <View className="h-auto w-full flex justify-center items-start">
                            <TouchableOpacity className="h-auto w-auto bg-blur flex flex-row justify-center items-center p-4 rounded-2xl gap-2.5" style={{ backgroundColor: applied === "dark" ? "#ffffff1a" : "#0000001a" }} onPress={() => navigator.navigate("Home")}>
                                <FontAwesomeIcon icon={faArrowLeft as IconProp} color={applied === "dark" ? "#FFFFFF" : "#000000"} size={16} />
                                <Text className="text-black dark:text-white text-xl font-EncodeSansCondensedBold tracking-widest">Back</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="mt-10 h-auto w-full flex flex-col justify-center items-center gap-8">
                            <SvgUri height={100} uri={"https://raw.githubusercontent.com/thisalsalpura/linkup_frontend/master/assets/icons/logo.svg"} />
                            <Text className="text-black dark:text-white text-2xl font-EncodeSansCondensedBold tracking-wider">LinkUp</Text>
                        </View>

                        <View className="mt-10 h-auto w-full bg-blur flex justify-center items-start p-6 rounded-2xl gap-6" style={{ backgroundColor: applied === "dark" ? "#ffffff1a" : "#0000001a" }}>
                            <Text className="text-black dark:text-white text-xl font-EncodeSansCondensedBold tracking-widest">Setting</Text>

                            <View className="h-auto w-full border-b border-b-gray-400" />

                            <View className="h-auto w-full flex flex-col justify-start items-start">
                                <RadioGroup
                                    radioButtons={radioButtons}
                                    onPress={(id) => {
                                        setSelectedId(id as "light" | "dark" | "system");
                                        setPreference(id as "light" | "dark" | "system");
                                    }}
                                    selectedId={selectedId}
                                    layout="column"
                                    labelStyle={{ color: applied === "dark" ? "#FFFFFF" : "#000000", fontSize: 16, fontFamily: "EncodeSansCondensedMedium", marginLeft: 25 }}
                                    containerStyle={{ height: "auto", width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 10 }}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>

            <StatusBar hidden={false} />
        </SafeAreaView>
    );
}