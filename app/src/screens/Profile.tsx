import React from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    return (
        <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}>
                <KeyboardAwareScrollView className="flex-1 bg-white dark:bg-[#1C1C21]" contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false} extraScrollHeight={20} enableOnAndroid={true} keyboardShouldPersistTaps="handled" enableAutomaticScroll={true}>

                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>

            <StatusBar hidden={false} />
        </SafeAreaView>
    );
}