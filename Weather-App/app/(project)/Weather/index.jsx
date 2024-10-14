import { Button, SafeAreaView } from "react-native";
import React from "react";
import { Stack, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
const ProjectDetailScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Stack.Screen
        options={{
          title: "Weather App",
        }}
      />
      <Link
        className=" text-blue-600 text-lg border border-blue-600 p-2 w-full text-center"
        href={"/Weather/weather"}
        asChild
      >
        <Button title="Go to Weather project" />
      </Link>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default ProjectDetailScreen;
