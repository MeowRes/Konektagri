import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-virtualized-view";
import Posting from "../../../components/Posting";
import { isJSDocNullableType } from "typescript";
const Home = () => {
  return (
    <ScrollView>
      <StatusBar style="dark" />
      {/* PostCard */}
      <Posting />
    </ScrollView>
  );
};

export default Home;
