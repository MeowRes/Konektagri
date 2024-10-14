import {
  View,
  ActivityIndicator,
  Image,
  Text,
  FlatList,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
// import LottieView from "lottie-react-native";
import ForcaseItem from "../../../components/ForcaseItem";
const weather = () => {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forcase, setforcase] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const bgURL =
    "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const getCurrentWeather = async () => {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?lat=11.562108&lon=104.888535&appid=efecf6b171413766bd1770f6875e84e9&units=metric";
    const forcaseURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=11.562108&lon=104.888535&appid=efecf6b171413766bd1770f6875e84e9&units=metric";
    const response = await fetch(url);
    const forcaseResponse = await fetch(forcaseURL);
    const dataForcase = await forcaseResponse.json();
    const data = await response.json();
    setCurrentWeather(data);
    setforcase(dataForcase);
    setIsLoading(false);
  };
  useEffect(() => {
    getCurrentWeather();
  }, []);
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <ImageBackground
      source={{ uri: bgURL }}
      className="flex-1 items-center bg-white"
      resizeMode="cover"
    >
      <View className="px-4">
        <Stack.Screen options={{ headerShown: false }} />
        <View className="items-center gap-y-5 my-20">
          <Image />
          <Text className="text-3xl text-white font-bold">
            {currentWeather.name}
          </Text>
          <Text className="text-8xl leading-loose font-bold text-white">
            {currentWeather.main.temp + "°C"}
          </Text>
          <Text className="text-3xl font-bold text-white ">
            {currentWeather.weather[0].main}
          </Text>
          <View className="flex-row justify-center gap-x-6 items-center">
            <MaterialCommunityIcons
              name="weather-cloudy"
              size={40}
              color={"white"}
            />
            <Text className="text-xl text-white">
              {currentWeather.clouds.all+"°"}
            </Text>
          </View>
          <View className="flex-row justify-center gap-x-6 items-center">
            <Feather name="wind" size={40} color={"white"} />
            <Text className="text-xl text-white">
              {currentWeather.wind.speed+"°"}
            </Text>
          </View>
        </View>

        <FlatList
          data={forcase.list}
          className="mt-5"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => <ForcaseItem item={item} />}
        />
      </View>
    </ImageBackground>
  );
};

export default weather;
