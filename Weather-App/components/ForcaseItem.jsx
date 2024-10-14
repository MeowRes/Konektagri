import { View, Text } from "react-native";
import React from "react";
import moment from "moment";
import { BlurView } from "expo-blur";
const ForcaseItem = ({ item }) => {
  return (
    <BlurView
      intensity={30}
      className="w-32 h-44 px-2 justify-center items-center bg-[gainsboro] rounded-lg overflow-hidden"
    >
      <Text className="text-3xl text-white font-bold">
        {item.main.temp + "°C"}
      </Text>
      <Text className="text-md text-white font-bold">
        {moment(item.dt_txt).format("dddd") +
          " " +
          moment(item.dt_txt).format("LT")}
      </Text>
    </BlurView>
  );
};

export default ForcaseItem;
