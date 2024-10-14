import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Project = ({ item }) => {
  return (
    <Link
      href={item.link}
      className="w-full h-56 bg-gray-200 m-2 rounded-lg overflow-hidden justify-center items-center"
      // style={{ aspectRatio: 1 }}
    >
      <Text>{item.title}</Text>
    </Link>
  );
};

export default Project;
