import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { router } from "expo-router";
const Index = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-between px-4 py-7">
      <StatusBar style="dark" />
      <View className="space-y-10">
        <Text
          className="font-pbold text-center text-neutral-700"
          style={{ fontSize: hp(3.5) }}
        >
          Vegetable Management
        </Text>
        <Image
          style={{ width: wp(80), height: wp(80) }}
          contentFit="contain"
          source={require("../assets/logoes/welcom-illustration.png")}
        />
      </View>
      <TouchableOpacity
        className="bg-neutral-700 w-full rounded-xl items-center flex-row justify-between p-4 gap-x-2"
        onPress={() => router.push("/login")}
      >
        <Text
          className="font-psemibold mt-1 text-white"
          style={{ fontSize: hp(2.2) }}
        >
          Get start with login an account
        </Text>
        <Ionicons name="arrow-forward" size={hp(2.5)} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
