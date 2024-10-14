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

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoadig] = useState(false);
  const { login } = useAuth();
  const handleLogin = async () => {
    try {
      if (!form.email || !form.password) {
        Alert.alert("Login", "Please fill in all the field!");
      }
      setIsLoadig(true);
      const response = await login(form.email, form.password);
      if (!response.success) {
        Alert.alert("Login", response?.msg);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoadig(false);
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
          onPress={() => router.replace("/")}
          className="absolute top-10 left-4"
        >
          <AntDesign name="arrowleft" size={hp(4)} color="white" />
        </TouchableOpacity>

        <Text style={{ fontSize: hp(4) }} className="text-white font-bold mb-5">
          Login Account
        </Text>
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
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-green-600 w-full justify-center items-center rounded-lg"
          style={{ height: hp(5.5) }}
        >
          <Text
            className="font-semibold text-white"
            style={{ fontSize: hp(2) }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <View className="justify-center flex-row gap-2 mt-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Don't have an account
          </Text>
          <Link
            href={"/sign-up"}
            className="text-lg font-semibold text-white text-secondary"
          >
            Sign up
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
