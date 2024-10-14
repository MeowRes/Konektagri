import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";
import Project from "../components/Project";

const App = () => {
  const project = [{ title: "Weather App", link: "/(project)/Weather" }];

  return (
    <SafeAreaView className="flex-1 px-4 items-center">
      <View className="flex-1 justify-end items-center">
        <Text className="text-2xl mb-5 font-bold">Project Lists</Text>
      </View>
      <View className="flex-[7] w-[60%]">
        <FlatList
          data={project}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Project item={item} />}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
