import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchExercisesByBodyPart } from "../api/exerciseDB";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import ExerciseList from "../components/ExerciseList";
import { ScrollView } from "react-native-virtualized-view";
const exercises = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [exercise, setExercise] = useState([]);
  useEffect(() => {
    if (item) getExercisesBodyPart(item.name);
  }, [item]);
  const getExercisesBodyPart = async (bodypart) => {
    const data = await fetchExercisesByBodyPart(bodypart);
    setExercise(data);
  };
  return (
    <ScrollView>
      <StatusBar style="light" />
      <Image
        source={item.image}
        resizeMode="cover"
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-xl"
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-rose-500 rounded-full pr-1 justify-center items-center absolute mx-4 my-10"
        style={{ width: hp(6.5), height: hp(6.5) }}
      >
        <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>

      {/* exercises */}
      <View className="mx-4 space-y-4 my-4">
        <Text
          className=" font-semibold text-neutral-700"
          style={{ fontSize: hp(3) }}
        >
          {item.name} exercise
        </Text>
      </View>
      {/* Show ExerciseList */}
      <View className="mb-20 mx-4">
        <ExerciseList data={exercise} />
      </View>
    </ScrollView>
  );
};

export default exercises;
