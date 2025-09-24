import React from "react";
import { useCustomFonts } from "./hooks/UseFonts";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loader from "./components/Loader";
import Splash from "./screens/Splash";
import SignIn from "./screens/SignIn";
import NumberRegistration from "./screens/NumberRegistration";
import AvatarAdding from "./screens/AvatarAdding";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import { ThemeProvider } from "./theme/ThemeProvider";
import { PaperProvider } from "react-native-paper";
import "./global.css";

export type RootParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  NumberRegistration: undefined;
  AvatarAdding: undefined;
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
      <PaperProvider
        theme={{
          roundness: 10,
          fonts: {
            bodyLarge: { fontFamily: "EncodeSansCondensedMedium" },
            bodyMedium: { fontFamily: "EncodeSansCondensedMedium" },
            bodySmall: { fontFamily: "EncodeSansCondensedMedium" },
            labelLarge: { fontSize: 18, fontFamily: "EncodeSansCondensedMedium" },
            labelMedium: { fontSize: 18, fontFamily: "EncodeSansCondensedMedium" },
            labelSmall: { fontSize: 18, fontFamily: "EncodeSansCondensedMedium" },
            titleLarge: { fontFamily: "EncodeSansCondensedBold" },
            titleMedium: { fontFamily: "EncodeSansCondensedBold" },
            titleSmall: { fontFamily: "EncodeSansCondensedBold" },
            headlineLarge: { fontFamily: "EncodeSansCondensedBold" },
            headlineMedium: { fontFamily: "EncodeSansCondensedBold" },
            headlineSmall: { fontFamily: "EncodeSansCondensedBold" },
            displayLarge: { fontFamily: "EncodeSansCondensedBold" },
            displayMedium: { fontFamily: "EncodeSansCondensedBold" },
            displaySmall: { fontFamily: "EncodeSansCondensedBold" }
          }
        }}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ animation: "fade", headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="NumberRegistration" component={NumberRegistration} />
            <Stack.Screen name="AvatarAdding" component={AvatarAdding} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}