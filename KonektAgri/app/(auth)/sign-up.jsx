import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import FormField from "../../components/FormField";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router, Link } from "expo-router";
import { useAuth } from "../../context/authContext";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    profileUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const handleRegister = async () => {
    try {
      if (!form.username || !form.email || !form.password || !form.profileUrl) {
        Alert.alert("Sign Up", "Please fill all the fields!");
      }
      setIsLoading(true);
      const response = await register(
        form.email,
        form.password,
        form.username,
        form.profileUrl
      );
      if (!response.success) {
        Alert.alert("Sign Up", response.msg);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="light" />
      <Image
        source={require("../../assets/konekt_land.jpg")}
        className="w-full h-full absolute"
        contentFit="cover"
      />
      <View className="flex-1 items-center justify-center px-4 relative">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-10 left-4"
        >
          <AntDesign name="arrowleft" size={hp(4)} color="white" />
        </TouchableOpacity>

        <Text style={{ fontSize: hp(4) }} className="text-white font-bold mb-5">
          Register Account
        </Text>
        <FormField
          title={"Username"}
          placeholder={"Enter Your Name"}
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
        />
        <FormField
          title={"Email"}
          placeholder={"Enter Your Email"}
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
        />
        <FormField
          title={"Password"}
          placeholder={"Enter Your Password"}
          otherStyle={"my-5"}
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />
        <FormField
          title={"Profile URL"}
          value={form.profileUrl}
          otherStyle={"mb-3"}
          placeholder={"Enter Your Profile Url"}
          handleChangeText={(e) => setForm({ ...form, profileUrl: e })}
        />
        <TouchableOpacity
          onPress={handleRegister}
          className="bg-green-600 w-full justify-center items-center rounded-lg"
          style={{ height: hp(5.5) }}
        >
          <Text
            className="font-semibold text-white"
            style={{ fontSize: hp(2) }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
