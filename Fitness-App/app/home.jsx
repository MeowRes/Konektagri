import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageSlide from "../components/ImageSlide";
import BodyPart from "../components/BodyPart";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white space-y-5" edges={["top"]}>
      <StatusBar style="dark" />

      {/* puchiline and avatar */}
      <View className="flex-row justify-between items-center mx-5">
        <View className="space-y-2">
          <Text
            style={{ fontSize: hp(4.5) }}
            className="font-bold tracking-wider text-neutral-700 uppercase"
          >
            Ready To
          </Text>
          <Text
            style={{ fontSize: hp(4.5) }}
            className="font-bold tracking-wider text-rose-500 uppercase"
          >
            Workout
          </Text>
        </View>
        <View className="flex justify-center items-center space-y-2">
          <Image
            source={require("../assets/images/avatar.png")}
            style={{ height: hp(6), width: hp(6) }}
            className=" rounded-full"
          />
          <View
            className="bg-neutral-200 rounded-full flex justify-center items-center border border-neutral-300 "
            style={{ height: hp(5.5), width: hp(5.5) }}
          >
            <Ionicons name="notifications" size={hp(5.5)} color="#900" />
          </View>
        </View>
      </View>

      {/* Image slider */}
      <View>
        <ImageSlide />
      </View>

      {/* BodyPartGrid */}
      <View className="flex-1">
        <BodyPart />
      </View>
    </SafeAreaView>
  );
};

export default Home;
