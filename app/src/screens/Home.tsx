import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from "./home_tabs/Chats";
import Status from "./home_tabs/Status";
import Calls from "./home_tabs/Calls";
import { faComment, faChartBar, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { StatusBar } from "expo-status-bar";

const Tabs = createBottomTabNavigator();

export default function Home() {
    return (
        <SafeAreaView className="flex-1 bg-sand-400" edges={["top", "bottom"]}>
            <Tabs.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName = faComment;
                    if (route.name === "Chats") {
                        iconName = faComment;
                    } else if (route.name === "Status") {
                        iconName = faChartBar;
                    } else if (route.name === "Calls") {
                        iconName = faPhone;
                    }

                    return <FontAwesomeIcon icon={iconName as IconProp} color="#000000" size={22} />
                },
                animation: "fade",
                headerShown: false,
                headerShadowVisible: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#000000",
                tabBarInactiveTintColor: "#F3F4F6",
                tabBarStyle: {
                    backgroundColor: "#D5BDAF",
                    paddingTop: 12,
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    height: "auto"
                },
            })}>
                <Tabs.Screen name="Chats" component={Chats} />
                <Tabs.Screen name="Status" component={Status} />
                <Tabs.Screen name="Calls" component={Calls} />
            </Tabs.Navigator>

            <StatusBar hidden={true} />
        </SafeAreaView>
    );
}