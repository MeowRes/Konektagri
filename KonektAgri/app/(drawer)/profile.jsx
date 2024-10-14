import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";

const Profile = () => {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <SafeAreaView>
      <TouchableOpacity className="mx-3 my-2" onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={hp(4)} color="black" />
      </TouchableOpacity>
      <View className="items-center">
        <View className="mb-2">
          <Text className="font-pbold" style={{ fontSize: hp(2.5) }}>
            {user.username}
          </Text>
        </View>
        <Image
          source={{ uri: user.profileUrl }}
          style={{ width: wp(25), height: wp(25) }}
          className="rounded-full"
          contentFit="cover"
        />
      </View>
      <View className="mt-8 mb-4">
        <TouchableOpacity
          className="w-full h-[70px] border-b-[1px] border-gray-300 px-4 flex-row justify-between items-center"
          onPress={() => router.navigate("")}
        >
          <View className="space-x-10 flex-row items-center">
            <Ionicons name="person-outline" size={hp(3)} color="gray" />
            <Text
              className="font-psemibold mt-1 text-gray-600"
              style={{ fontSize: hp(2) }}
            >
              My Profile
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={hp(3)} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full h-[70px] border-b-[1px] border-gray-300 px-4 flex-row justify-between items-center"
          onPress={() => router.navigate("")}
        >
          <View className="space-x-10 flex-row items-center">
            <Ionicons name="chatbubble-outline" size={hp(3)} color="gray" />
            <Text
              className="font-psemibold mt-1 text-gray-600"
              style={{ fontSize: hp(2) }}
            >
              Message
            </Text>
          </View>
          <Ionicons name="arrow-forward-outline" size={hp(3)} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="w-full h-[70px] border-b-[1px] border-gray-300 px-4 flex-row justify-between items-center">
          <View className="space-x-10 flex-row items-center">
            <Ionicons name="heart-outline" size={hp(3)} color="gray" />
            <Text
              className="font-psemibold mt-1 text-gray-600"
              style={{ fontSize: hp(2) }}
            >
              Your Favorite
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={hp(3)} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="w-full h-[70px] border-b-[1px] border-gray-300 px-4 flex-row justify-between items-center">
          <View className="space-x-10 flex-row items-center">
            <Ionicons name="location-outline" size={hp(3)} color="gray" />
            <Text
              className="font-psemibold mt-1 text-gray-600"
              style={{ fontSize: hp(2) }}
            >
              Location
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={hp(3)} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="w-full h-[70px] border-b-[1px] border-gray-300 px-4 flex-row justify-between items-center">
          <View className="space-x-10 flex-row items-center">
            <Ionicons name="settings-outline" size={hp(3)} color="gray" />
            <Text
              className="font-psemibold mt-1 text-gray-600"
              style={{ fontSize: hp(2) }}
            >
              Settings
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={hp(3)} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="w-full h-[70px] border-b-[1px] border-gray-300 px-4 flex-row justify-between items-center" onPress={handleLogout}>
          <View className="space-x-10 flex-row items-center">
            <Ionicons name="log-out-outline" size={hp(3)} color="gray" />
            <Text
              className="font-psemibold mt-1 text-gray-600"
              style={{ fontSize: hp(2) }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
