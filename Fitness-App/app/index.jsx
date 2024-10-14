import { View, Text, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeInDown,
} from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  return (
    <View className="flex-1 flex justify-end">
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/welcome.png")}
        className="w-full h-full absolute"
      />
      <LinearGradient
        colors={["transparent", "#18181b"]}
        style={{ width: wp(100), height: hp(70) }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        className="flex justify-end pb-12 space-y-8"
      >
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="flex items-center"
        >
          <Text
            className="text-white  font-bold tracking-wide"
            style={{ fontSize: hp(5) }}
          >
            Best <Text className="text-rose-500">Workout</Text>
          </Text>
          <Text
            className="text-white  font-bold tracking-wide"
            style={{ fontSize: hp(5) }}
          >
            For you
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <TouchableOpacity
            onPress={() => router.push("home")}
            style={{ height: hp(7), width: wp(80) }}
            className="bg-rose-500 flex justify-center items-center mx-auto rounded-full border border-neutral-200"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="text-white font-bold tracking-wide"
            >
              Get Start
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default Index;
