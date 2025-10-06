import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LayoutChangeEvent, Text, TouchableOpacity, View } from "react-native";
import { faCamera, faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../hooks/AuthProvider";

type NavigationProps = NativeStackNavigationProp<RootParamList, "Home">;

export default function Header() {

    const navigator = useNavigation<NavigationProps>();

    const insets = useSafeAreaInsets();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [headerHeight, setHeaderHeight] = useState(0);

    const onHeaderLayout = (e: LayoutChangeEvent) => {
        setHeaderHeight(e.nativeEvent.layout.height);
    };

    const auth = useContext(AuthContext);

    return (
        <>
            <View onLayout={onHeaderLayout} className="h-auto w-full bg-sand-400 flex-row justify-center items-center px-4 py-4">
                <View className="flex-1">
                    <Text className="text-black text-2xl font-EncodeSansCondensedExtraBold tracking-wider">LinkUp</Text>
                </View>

                <TouchableOpacity className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faCamera as IconProp} color="#000000" size={24} style={{ marginRight: 25 }} />
                </TouchableOpacity>

                <TouchableOpacity className="flex justify-center items-center" onPress={toggleModal}>
                    <FontAwesomeIcon icon={(isModalVisible ? faClose : faBars) as IconProp} color="#000000" size={24} />
                </TouchableOpacity>
            </View>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                backdropOpacity={0}
                style={{ alignItems: "center", margin: 0 }}
            >
                <View className="absolute h-auto w-[90%] flex justify-center items-center bg-black dark:bg-white border-2 border-black dark:border-white p-6 rounded-[10px] gap-6" style={{ top: insets.top + headerHeight }}>
                    <TouchableOpacity className="h-auto w-full flex justify-center items-center" onPress={() => navigator.navigate("Profile")}>
                        <Text className="text-xl text-white dark:text-black font-EncodeSansCondensedBold tracking-wide">Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="h-auto w-full flex justify-center items-center" onPress={() => navigator.navigate("Setting")}>
                        <Text className="text-xl text-white dark:text-black font-EncodeSansCondensedBold tracking-wide">Setting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="h-auto w-full flex justify-center items-center" onPress={() => {
                        if (auth) auth.signOut();
                        navigator.replace("Splash");
                    }}>
                        <Text className="text-xl text-white dark:text-black font-EncodeSansCondensedBold tracking-wide">Logout</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
}