import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import { useTheme } from "../theme/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import CircleShape from "../components/CircleShape";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = NativeStackNavigationProp<RootParamList, "NumberRegistration">;

export default function SignUp() {

    const navigator = useNavigation<NavigationProps>();

    const { applied } = useTheme();

    const [fname, setFname] = useState('');

    const [lname, setLname] = useState('');

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
                            <Text className="text-black dark:text-white text-lg font-EncodeSansCondensedMedium tracking-widest">Let's setup Account!</Text>
                        </View>

                        <View className="mt-10 h-auto w-full flex justify-center items-start">
                            <View className="h-auto w-auto bg-sand-400 rounded-full px-4 py-2">
                                <Text className="text-black text-lg font-EncodeSansCondensedMedium tracking-widest">Step 1</Text>
                            </View>
                        </View>

                        <View className="mt-10 h-auto w-full flex flex-col justify-center items-center gap-8">
                            <View className="h-auto w-full flex justify-center items-center">
                                <TextInput
                                    label="First Name"
                                    value={fname}
                                    onChangeText={setFname}
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

                            <View className="h-auto w-full flex justify-center items-center">
                                <TextInput
                                    label="Last Name"
                                    value={lname}
                                    onChangeText={setLname}
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

                        <View className="mt-10 h-auto w-full flex flex-col justify-center items-center gap-8">
                            <Button name="Next" onPress={() => { navigator.replace("NumberRegistration") }} containerClass="bg-black dark:bg-white border-2 border-black dark:border-white" textClass="text-white dark:text-black" showIcon={true} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>

            <CircleShape height={200} width={200} fillColor="#D5BDAF" borderRadius={999} bottomValue={-30} rightValue={-95} />
            <CircleShape height={150} width={150} fillColor="#D5BDAF" borderRadius={999} bottomValue={-40} rightValue={45} />

            <StatusBar hidden={true} />
        </SafeAreaView>
    );
}