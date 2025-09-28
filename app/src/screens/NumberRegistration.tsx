import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-paper";
import { useTheme } from "../theme/ThemeProvider";
import Button from "../components/Button";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { RootParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../hooks/UserContext";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { validateCountryCode, validateMobile } from "../util/Validation";

type NavigationProps = NativeStackNavigationProp<RootParamList, "NumberRegistration">;

export default function NumberRegistration() {

    const navigator = useNavigation<NavigationProps>();

    const { applied } = useTheme();

    const [callingCode, setCallingCode] = useState("+94");

    const [mobile, setMobile] = useState('');

    const [show, setShow] = useState<boolean>(false);

    const [countryCode, setCountryCode] = useState<CountryCode>("LK");

    const [country, setCountry] = useState<Country | null>(null);

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
                <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                    <KeyboardAwareScrollView className="flex-1 bg-white dark:bg-[#1C1C21]" contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false} extraScrollHeight={20} enableOnAndroid={true} keyboardShouldPersistTaps="handled" enableAutomaticScroll={true}>
                        <View className="flex-1 w-full justify-start items-center px-8 py-12">
                            <View className="h-auto w-full flex flex-col justify-center items-center gap-8">
                                <SvgUri height={100} uri={"https://raw.githubusercontent.com/thisalsalpura/linkup_frontend/master/assets/icons/logo.svg"} />
                                <Text className="text-black dark:text-white text-2xl font-EncodeSansCondensedBold tracking-wider">LinkUp</Text>
                            </View>

                            <View className="mt-10 h-auto w-full flex justify-center items-center">
                                <Text className="text-black dark:text-white text-lg font-EncodeSansCondensedMedium tracking-widest">Let's register your Mobile Number!</Text>
                            </View>

                            <View className="mt-10 h-auto w-full flex justify-center items-start">
                                <View className="h-auto w-auto bg-sand-400 rounded-full px-4 py-2">
                                    <Text className="text-black text-lg font-EncodeSansCondensedMedium tracking-widest">Step 2</Text>
                                </View>
                            </View>

                            <View className="mt-10 h-[50px] w-full bg-black dark:bg-white flex flex-row justify-center items-center border-2 border-black dark:border-white rounded-[10px]">
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
                                        backgroundColor: applied === "dark" ? "#FFFFFF" : "#1C1C21",
                                        onBackgroundTextColor: applied === "dark" ? "#000000" : "#FFFFFF",
                                        fontFamily: "EncodeSansCondensedBold",
                                    }}
                                />
                            </View>

                            <View className="mt-10 h-auto w-full flex flex-row justify-center items-start gap-2">
                                <View className="h-auto w-[30%] flex justify-center items-center">
                                    <TextInput
                                        label="Contry Code"
                                        value={country ? `+${country.callingCode}` : callingCode}
                                        editable={false}
                                        mode="outlined"
                                        textColor={applied === "dark" ? "#FFFFFF" : "#000000"}
                                        outlineColor="#E3D5CA"
                                        activeOutlineColor="#D5BDAF"
                                        keyboardType="phone-pad"
                                        style={{ height: 50, width: "100%", backgroundColor: applied === "dark" ? "#1C1C21" : "#FFFFFF" }}
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
                                        textColor={applied === "dark" ? "#FFFFFF" : "#000000"}
                                        outlineColor="#E3D5CA"
                                        activeOutlineColor="#D5BDAF"
                                        keyboardType="phone-pad"
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
                                <Button
                                    name="Next"
                                    onPress={() => {
                                        const validCountryCode = validateCountryCode(country ? `+${country.callingCode}` : callingCode);
                                        const validMobile = validateMobile(mobile);

                                        if (validCountryCode) {
                                            Toast.show({
                                                type: ALERT_TYPE.WARNING,
                                                title: 'Warning',
                                                textBody: validCountryCode,
                                            });
                                        } if (validMobile) {
                                            Toast.show({
                                                type: ALERT_TYPE.WARNING,
                                                title: 'Warning',
                                                textBody: validMobile,
                                            });
                                        } else {
                                            setUserData((previous) => ({
                                                ...previous,
                                                countryCode: country ? `+${country.callingCode}` : callingCode,
                                                mobile: mobile
                                            }));

                                            navigator.replace("AvatarAdding");
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