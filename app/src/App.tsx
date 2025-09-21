import React from "react";
import { useCustomFonts } from "./hooks/UseFonts";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loader from "./components/Loader";
import Splash from "./screens/Splash";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./global.css";

export type RootParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
}

export default function App() {

  const Stack = createNativeStackNavigator<RootParamList>();

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (<Loader />);
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ animation: "fade", headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}