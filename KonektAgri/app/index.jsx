import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
const Index = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar style="light" />
      <ActivityIndicator size={"large"} color="gray" />
      <Image
        source={require("../assets/konekt_land.jpg")}
        className="w-full h-full absolute"
        contentFit="cover"
      />
      <View className="flex-1 justify-between items-center pt-24 pb-16 px-2">
        <View className="space-y-3 items-center">
          <Image
            source={require("../assets/konekt_logo.jpg")}
            style={{ width: wp(40), height: wp(40) }}
            className="rounded-full"
          />
          <Text
            className="text-white font-bold uppercase"
            style={{ fontSize: hp(3.5) }}
          >
            Welcome to <Text className="text-green-400">KonektAgri</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/sign-in")}
          className="bg-green-600 justify-center items-center rounded-lg"
          style={{ width: wp(85), height: hp(5.5) }}
        >
          <View className="flex-row items-center justify-center space-x-2">
            <Text
              className="font-semibold text-white"
              style={{ fontSize: hp(2) }}
            >
              Get Start
            </Text>
            <AntDesign
              name="arrowright"
              size={hp(2.5)}
              color="white"
              className="font-semibold"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
