import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router, Tabs, usePathname, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);
export const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
        },
        headerTintColor: "gray",
      }}
    >
      <Tabs.Screen
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={hp(4.5)}
              color={"gray"}
            />
          ),
          headerLeft: () => (
            <View className="mx-3">
              <DrawerToggleButton tintColor="gray" />
            </View>
          ),
          headerRight: () => (
            <View className="mx-4 flex-row space-x-3">
              <TouchableOpacity onPress={() => router.push("/post")}>
                <Ionicons name="create-outline" size={hp(3.5)} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="notifications-outline"
                  size={hp(3.5)}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          ),
        }}
        name="home"
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "stopwatch" : "stopwatch-outline"}
              size={hp(4.5)}
              color={"gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "receipt" : "receipt-outline"}
              size={hp(4.5)}
              color={"gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={hp(4.5)}
              color={"gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "bag" : "bag-outline"}
              size={hp(4.5)}
              color={"gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
