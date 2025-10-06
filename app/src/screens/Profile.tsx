import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as ImagePicker from 'expo-image-picker';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCamera } from "@fortawesome/free-regular-svg-icons";
import { useTheme } from "../theme/ThemeProvider";
import { TextInput } from "react-native-paper";
import Button from "../components/Button";
import { useUserProfile } from "../web_socket/services/UseUserProfile";
import Loader from "../components/Loader";
import { useUserRegistration } from "../hooks/UserContext";
import { validateFname, validateLname, validateProfileImage } from "../util/Validation";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { updateUserAccount } from "../api/UpdateUserAccount";
import { AuthContext } from "../hooks/AuthProvider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type NavigationProps = NativeStackNavigationProp<RootParamList, "Profile">;

export default function Profile() {

    const navigator = useNavigation<NavigationProps>();

    const { applied } = useTheme();

    const [loading, setLoading] = useState(false);

    const { userProfile, setUserProfile, loading: userProfileLoading } = useUserProfile();

    const [image, setImage] = useState<string | null>();

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

    const [fname, setFname] = useState('');

    const [lname, setLname] = useState('');

    const [callingCode, setCallingCode] = useState("+94");

    const [mobile, setMobile] = useState('');

    const { userData, setUserData } = useUserRegistration();

    const auth = useContext(AuthContext);

    useEffect(() => {
        if (userProfile.length > 0) {
            const user = userProfile[0];

            if (user.fname) setFname(user.fname);
            if (user.lname) setLname(user.lname);
            if (user.countryCode) setCallingCode(user.countryCode);
            if (user.mobile) setMobile(user.mobile);
            if (user.profileImage) setImage(user.profileImage);
        }
    }, [userProfile, setUserProfile]);

    return (
        <AlertNotificationRoot
            theme={applied === "dark" ? "light" : "dark"}
            toastConfig={{
                titleStyle: { fontFamily: "EncodeSansCondensedBold", fontSize: 18 },
                textBodyStyle: { fontFamily: "EncodeSansCondensedMedium", fontSize: 14 },
            }}
        >
            <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
                {(userProfileLoading || loading) && (
                    <View className="absolute inset-0 bg-blur loading-bg-blur justify-center items-center z-50">
                        <Loader />
                    </View>
                )}

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

                            <View className="mt-10 h-auto w-full bg-blur flex flex-col justify-center items-start p-6 rounded-2xl gap-6" style={{ backgroundColor: applied === "dark" ? "#ffffff1a" : "#0000001a" }}>
                                <Text className="text-black dark:text-white text-xl font-EncodeSansCondensedBold tracking-widest">Profile</Text>

                                <View className="h-auto w-full border-b border-b-gray-400" />
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

                                <View className="h-auto w-full flex flex-row justify-center items-start gap-2">
                                    <View className="h-auto w-[30%] flex justify-center items-center">
                                        <TextInput
                                            label="Contry Code"
                                            value={callingCode}
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
                                </View>
                            </View>

                            <View className="mt-10 h-auto w-full flex flex-col justify-center items-center gap-8">
                                <Button
                                    name="Save"
                                    onPress={async () => {
                                        setUserData((previous) => ({
                                            ...previous,
                                            fname: fname,
                                            lname: lname
                                        }));

                                        const validFname = validateFname(fname);
                                        const validLname = validateLname(lname);

                                        if (validFname) {
                                            Toast.show({
                                                type: ALERT_TYPE.WARNING,
                                                title: 'Warning',
                                                textBody: validFname,
                                            });
                                        } else if (validLname) {
                                            Toast.show({
                                                type: ALERT_TYPE.WARNING,
                                                title: 'Warning',
                                                textBody: validLname,
                                            });
                                        } else {
                                            let validProfileImage;
                                            if (userData.profileImage) {
                                                validProfileImage = validateProfileImage({ uri: userData.profileImage, type: "", fileSize: 0 });

                                                if (validProfileImage) {
                                                    Toast.show({
                                                        type: ALERT_TYPE.WARNING,
                                                        title: 'Warning',
                                                        textBody: validProfileImage,
                                                    });
                                                }
                                            }

                                            try {
                                                setLoading(true);

                                                const response = await updateUserAccount(String(auth ? auth.userId : 0), userData);

                                                if (response.status) {
                                                    Toast.show({
                                                        type: ALERT_TYPE.SUCCESS,
                                                        title: 'Success',
                                                        textBody: response.message,
                                                    });

                                                    setUserProfile(response.user);
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

                <StatusBar hidden={false} />
            </SafeAreaView>
        </AlertNotificationRoot>
    );
}