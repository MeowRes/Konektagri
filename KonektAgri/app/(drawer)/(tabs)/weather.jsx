import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useAuth } from "../../../context/authContext";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Category from "../../../components/Category";
import { category } from "../../../api/data";
import Posting from "../../../components/Posting";
import { ScrollView } from "react-native-virtualized-view";
const Weather = () => {
  const { user } = useAuth();
  return (
    <View style={{ height: hp(46) }} className="rounded-b-[30px] px-4 py-10">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          className="rounded-full flex justify-center items-center bg-green-400"
          style={{ width: wp(11), height: wp(11) }}
        >
          <Ionicons name="notifications" size={hp(3)} color="white" />
        </TouchableOpacity>
        <View className="flex-row space-x-4 justify-center items-center">
          <View className="justify-center items-center">
            <Text
              style={{ fontSize: hp(1.6) }}
              className="text-white font-psemibold"
            >
              Good Morning
            </Text>
            <Text
              style={{ fontSize: hp(2.5) }}
              className="text-white font-pbold"
            >
              {user.username}
            </Text>
          </View>
          <Image
            source={{ uri: user.profileUrl }}
            style={{ width: wp(12), height: wp(12) }}
            contentFit="cover"
            className="rounded-full"
          />
        </View>
      </View>
      <View className="my-4">
        <Text style={{ fontSize: hp(2.5) }} className="font-pbold text-white">
          Today's Weather
        </Text>
        <View
          className="mt-3 px-6 py-4 w-full bg-white rounded-xl"
          style={{ height: hp(25) }}
        >
          <View className="flex-row justify-between">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="text-neutral-800 font-psemibold"
            >
              Today
            </Text>
            <Text
              className="text-neutral-800 font-pregular"
              style={{ fontSize: hp(1.7) }}
            >
              Sat, 4 Dec
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <View>
              <View className="flex-row items-center space-x-1">
                <Ionicons name="location" size={hp(2)} color="#262626" />
                <Text
                  className="text-neutral-800 font-pregular"
                  style={{ fontSize: hp(1.5) }}
                >
                  Toul Tompong, Phnom Penh
                </Text>
              </View>
              <Text
                style={{ fontSize: hp(6) }}
                className="font-psemibold text-neutral-800"
              >
                30°C
              </Text>
            </View>
            <View
              style={{
                width: wp(27),
                height: wp(27),
              }}
            >
              <Image
                source={{
                  uri: "https://www.pngall.com/wp-content/uploads/11/Weather-PNG-Pic.png",
                }}
                className="w-full h-full "
                contentFit="cover"
              />
            </View>
          </View>

          <View className="w-full bg-gray-400 h-[2px] rounded-full mb-1 mt-2"></View>
          <Text
            className="text-neutral-800 font-pregular"
            style={{ fontSize: hp(1.5) }}
          >
            Today is a Good Day For irrigation
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Weather;
