import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import { useTheme } from "../theme/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import CircleShape from "../components/CircleShape";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { RootParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../hooks/UserContext";
import { validateCountryCode, validateMobile } from "../util/Validation";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import Loader from "../components/Loader";
import { signInToUserAccount } from "../api/SignInToUserAccount";
import { AuthContext } from "../hooks/AuthProvider";

type NavigationProps = NativeStackNavigationProp<RootParamList, "SignIn">;

export default function SignIn() {

    const navigator = useNavigation<NavigationProps>();

    const { applied } = useTheme();

    const [loading, setLoading] = useState(false);

    const [callingCode, setCallingCode] = useState("+94");

    const [mobile, setMobile] = useState('');

    const [show, setShow] = useState<boolean>(false);

    const [countryCode, setCountryCode] = useState<CountryCode>("LK");

    const [country, setCountry] = useState<Country | null>(null);

    const { userData, setUserData } = useUserRegistration();

    const auth = useContext(AuthContext);

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
                                    name="SignIn"
                                    onPress={async () => {
                                        setUserData((previous) => ({
                                            ...previous,
                                            countryCode: country ? `+${country.callingCode}` : callingCode,
                                            mobile: mobile
                                        }));

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
                                            try {
                                                setLoading(true);

                                                const response = await signInToUserAccount(userData);

                                                if (response.status) {
                                                    Toast.show({
                                                        type: ALERT_TYPE.SUCCESS,
                                                        title: 'Success',
                                                        textBody: response.message,
                                                    });

                                                    const id = response.userId;
                                                    if (auth) {
                                                        await auth.signUp(String(id));
                                                    }

                                                    navigator.replace("Home");
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
                                    showIcon={false}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </KeyboardAvoidingView>

                <CircleShape height={200} width={200} fillColor="#D5BDAF" borderRadius={999} bottomValue={-30} rightValue={-95} />
                <CircleShape height={150} width={150} fillColor="#D5BDAF" borderRadius={999} bottomValue={-40} rightValue={45} />

                <StatusBar hidden={true} />
            </SafeAreaView>
        </AlertNotificationRoot>
    );
}