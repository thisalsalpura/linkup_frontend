import React, { useContext } from "react";
import { useCustomFonts } from "./hooks/UseFonts";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loader from "./components/Loader";
import Splash from "./screens/Splash";
import NumberRegistration from "./screens/NumberRegistration";
import AvatarAdding from "./screens/AvatarAdding";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import SingleChatScreen from "./screens/SingleChatScreen";
import FriendContacts from "./screens/FriendContacts";
import Profile from "./screens/Profile";
import Setting from "./screens/Setting";
import { ThemeProvider } from "./theme/ThemeProvider";
import { PaperProvider } from "react-native-paper";
import { UserRegistrationProvider } from "./hooks/UserContext";
import { WebSocketProvider } from "./web_socket/WebSocketProvider";
import { AuthContext, AuthProvider } from "./hooks/AuthProvider";
import "./global.css";

export type RootParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  NumberRegistration: undefined;
  AvatarAdding: undefined;
  Home: undefined;
  SingleChatScreen: {
    friendId: number;
    friendFname: string;
    friendLname: string;
    profileImage: string;
  };
  FriendContacts: undefined;
  Profile: undefined;
  Setting: undefined;
}

const Stack = createNativeStackNavigator<RootParamList>();

function LinkUp() {

  const auth = useContext(AuthContext);

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (<Loader />);
  }

  return (
    <WebSocketProvider userId={auth ? Number(auth.userId) : 0}>
      <ThemeProvider>
        <UserRegistrationProvider>
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
              <Stack.Navigator initialRouteName="Home" screenOptions={{ animation: "fade", headerShown: false }}>
                {auth?.isLoading ? (
                  <Stack.Screen name="Splash" component={Splash} />
                ) : auth?.userId === null ? (
                  <Stack.Group>
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="NumberRegistration" component={NumberRegistration} />
                    <Stack.Screen name="AvatarAdding" component={AvatarAdding} />
                  </Stack.Group>
                ) : (
                  <Stack.Group>
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="SingleChatScreen" component={SingleChatScreen} />
                    <Stack.Screen name="FriendContacts" component={FriendContacts} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Setting" component={Setting} />
                  </Stack.Group>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </UserRegistrationProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LinkUp />
    </AuthProvider>
  );
}