import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleShape from "../components/CircleShape";
import { StatusBar } from "expo-status-bar";
import { SvgUri } from "react-native-svg";
import * as ImagePicker from 'expo-image-picker';

export default function AvatarAdding() {
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
                    </View>
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>

            <CircleShape height={200} width={200} fillColor="#D5BDAF" borderRadius={999} bottomValue={-30} rightValue={-95} />
            <CircleShape height={150} width={150} fillColor="#D5BDAF" borderRadius={999} bottomValue={-40} rightValue={45} />

            <StatusBar hidden={true} />
        </SafeAreaView>
    );
}