import React, { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  IBMPlexSans_400Regular,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_700Bold,
} from "@expo-google-fonts/ibm-plex-sans";

import MainScreen from "./screens/MainScreen";
import CreateNoteScreen from "./screens/CreateNoteScreen";
import NoteDetailScreen from "./screens/NoteDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // Loading the Fonts and show Splash Screen while it loads
  let [fontsLoaded] = useFonts({
    IBMPlexSans_400Regular,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        contentStyle={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="CreateNoteScreen" component={CreateNoteScreen} />
        <Stack.Screen name="NoteDetailScreen" component={NoteDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
