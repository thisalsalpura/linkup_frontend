import React from "react";
import { useCustomFonts } from "./hooks/UseFonts";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./screens/Splash";
import "./global.css";
import Loader from "./components/Loader";

export type RootParamList = {
  Splash: undefined;
  SignIn: undefined;
  Register: undefined;
  Home: undefined;
}

export default function App() {

  const Stack = createNativeStackNavigator<RootParamList>();

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (<Loader />);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}