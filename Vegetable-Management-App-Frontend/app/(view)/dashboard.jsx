import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const GridItem = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(item.link)}
      style={{ height: hp(14.5) }}
      className="flex-1 m-1 bg-green-500 rounded-lg items-center py-4 px-1 justify-between"
    >
      <Image
        style={{ width: wp(13), height: wp(13) }}
        contentFit="cover"
        source={item.icon}
      />
      <Text
        className="font-psemibold text-center text-white"
        style={{ fontSize: hp(1.6) }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};
const Dashboard = () => {
  const data = [
    {
      id: "1",
      title: "Complete Data Overview",
      link: "overview_data",
      icon: require("../../assets/logoes/clipboard.png"),
    },
    {
      id: "2",
      title: "Agricultural Cooperatives",
      link: "ac",
      icon: require("../../assets/logoes/cooperation.png"),
    },
    {
      id: "3",
      title: "Farmers",
      link: "farmer",
      icon: require("../../assets/logoes/farmer.png"),
    },
    {
      id: "4",
      title: "Vegetable",
      link: "vegetable",
      icon: require("../../assets/logoes/vegetable.png"),
    },
    {
      id: "5",
      title: "Addresses",
      link: "address",
      icon: require("../../assets/logoes/address.png"),
    },
    {
      id: "6",
      title: "District Facilitate",
      link: "df",
      icon: require("../../assets/logoes/user.png"),
    },
    {
      id: "7",
      title: "Create New List",
      link: "create_list",
      icon: require("../../assets/logoes/checklist.png"),
    },
  ];
  return (
    <SafeAreaView className="p-4 flex-1 bg-green-700">
      <StatusBar style="light" />
      <View className="flex-row justify-between mt-7 items-center">
        <View>
          <Text
            style={{ fontSize: hp(3.3) }}
            className="font-psemibold text-white"
          >
            Welcome To,
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="font-psemibold text-yellow-300"
          >
            Vegetable Management
          </Text>
        </View>
        <Image
          source={require("../../assets/logoes/konekt_logo.jpg")}
          style={{ width: wp(18), height: wp(18) }}
          className="rounded-full"
          contentFit="cover"
        />
      </View>
      <View className=" flex-1 justify-center mb-20">
        <Text
          className="font-psemibold text-white mb-2"
          style={{ fontSize: hp(2.3) }}
        >
          Dashboard
        </Text>
        <View className="border border-green-500 rounded-lg ">
          <FlatList
            numColumns={3}
            data={data}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ padding: 8 }}
            renderItem={({ item }) => <GridItem item={item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
