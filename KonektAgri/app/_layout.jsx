import {
  Redirect,
  SplashScreen,
  Stack,
  router,
  useSegments,
  Link,
} from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const MainLayout = () => {
  const { isAuthenticated, user, setLocation, setLocationMsg } = useAuth();
  const segments = useSegments();
  const [appState, setAppState] = useState(AppState.currentState);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Request location permission and get the current location
  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setIsPermissionGranted(status === "granted");

    if (status !== "granted") {
      setLocationMsg("Permission to access location was denied");
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let reverseGeocodeAsync = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      setLocation(reverseGeocodeAsync[0]);
      // console.log(reverseGeocodeAsync);
      await AsyncStorage.setItem(
        "locationData",
        JSON.stringify(reverseGeocodeAsync)
      );
    }
  };

  // Handle app state changes to clear location data
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === "background" || nextAppState === "inactive") {
      await AsyncStorage.removeItem("locationData");
      setLocation(null); // Clear address state
      setIsPermissionGranted(false); // Reset permission state
      console.log("Location data cleared");
    } else if (
      nextAppState === "active" &&
      appState.match(/inactive|background/)
    ) {
      checkPermissions();
    }
    setAppState(nextAppState);
  };

  // Check user authentication and handle routing
  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("/home");
    } else if (isAuthenticated == false) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated]);

  const isProfileScreen = segments.includes("profile");
  const screenOption = isProfileScreen ? { headerShown: false } : {};

  return (
    <Stack
      screenOptions={{ headerTintColor: "gray", headerTitleAlign: "center" }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(view)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(drawer)"
        options={{
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/home")}>
              <Image
                source={require("../assets/konekt_logo.jpg")}
                style={{ width: wp(12), height: wp(12) }}
                contentFit="cover"
                className="rounded-full border border-green-500"
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <TouchableOpacity onPress={() => router.push("/post")}>
              <Image
                source={{ uri: user.profileUrl }}
                style={{ width: wp(12), height: wp(12) }}
                contentFit="cover"
                className="rounded-full"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Ionicons name="settings-outline" size={hp(3.5)} color="gray" />
          ),
          ...screenOption,
        }}
      />
    </Stack>
  );
};

const App = () => {
  const [FontLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (FontLoaded) SplashScreen.hideAsync();
  }, [FontLoaded, error]);

  if (!FontLoaded && !error) return null;

  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
};

export default App;
