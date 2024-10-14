import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { request } from "../../lib/Require";
import { useGlobalContext } from "../../context/GlobalProvider";
const Login = () => {
  const { setAccessToken } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
    if (!form.email) {
      Alert.alert("Email", "You missed input your emial!");
      return;
    }
    if (!form.password) {
      Alert.alert("Password", "You missed input your password!");
      return;
    }
    const data = await request("authentication/login", "post", {
      email: form.email,
      password: form.password,
    });
    if (data.message == "Login successfully!") {
      setAccessToken(data.access_token);
      Alert.alert(
        "Login",
        data.message,
        [
          {
            text: "Ok",
            onPress: () => router.replace("/dashboard"),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("Login fail", data.message);
      return;
    }
  };
  return (
    <ScrollView className="flex-1 p-4">
      <View className="items-center">
        <Image
          style={{ width: wp(60), height: wp(60) }}
          contentFit="contain"
          source={require("../../assets/logoes/authentication.png")}
        />
        <Text className="font-pbold" style={{ fontSize: hp(3.5) }}>
          Sign In
        </Text>
      </View>
      <View className="gap-y-2 flex-col mt-4">
        <Text className=" font-psemibold text-lg">Email: </Text>
        <TextInput
          value={form.email}
          //   placeholder="Enter your email"
          className="w-full border border-gray-400 px-4 py-3 rounded-xl text-lg"
          onChangeText={(prev) => setForm({ ...form, email: prev })}
        />
      </View>
      <View className="gap-y-2 flex-col mt-4">
        <Text className=" font-psemibold text-lg">Password: </Text>
        <TextInput
          //   placeholder="Enter your password..."
          className="w-full border border-gray-400 px-4 py-3 rounded-xl text-lg"
          secureTextEntry
          value={form.password}
          onChangeText={(prev) => setForm({ ...form, password: prev })}
        />
      </View>
      <TouchableOpacity
        className="w-full bg-green-500 rounded-xl py-3 mt-10 items-center"
        onPress={handleLogin}
      >
        <Text
          className="text-white font-psemibold"
          style={{ fontSize: hp(2.3) }}
        >
          Log in
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;
