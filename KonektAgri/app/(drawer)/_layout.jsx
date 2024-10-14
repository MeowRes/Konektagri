import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router, useLocalSearchParams, usePathname } from "expo-router";

const CustomDrawerContent = (props) => {
  const pathname = usePathname();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        icon={() => (
          <Ionicons
            size={hp(3.5)}
            color={"gray"}
            name={pathname == "/home" ? "home" : "home-outline"}
          />
        )}
        label={"Home"}
        labelStyle={{ fontSize: hp(2.5) }}
        onPress={() => router.push("/home")}
      />
      <DrawerItem
        icon={() => (
          <Ionicons
            size={hp(3.5)}
            color={"gray"}
            name={pathname == "/profile" ? "person-sharp" : "person-outline"}
          />
        )}
        label={"My Profile"}
        labelStyle={{ fontSize: hp(2.5) }}
        onPress={() => router.push("/profile")}
      />
    </DrawerContentScrollView>
  );
};
const DrawLayout = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    />
  );
};

export default DrawLayout;
