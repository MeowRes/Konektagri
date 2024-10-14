import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../../context/authContext";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view";
import * as ImagePicker from "expo-image-picker";
import FormField from "../../components/FormField";
//  title, placeholder, value, handleChangeText, otherStyle,
const post = () => {
  const { location, user } = useAuth();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [form, setForm] = useState({
    image: null,
    caption: "",
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0].uri });
    }
  };
  return (
    <ScrollView className="m-4">
      <View className="mb-5 flex-row space-x-3">
        <Image
          source={{ uri: user.profileUrl }}
          style={{ width: wp(17), height: wp(17) }}
          className="rounded-full"
          contentFit="cover"
        />
        <View className="mb-4">
          <Text style={{ fontSize: hp(3) }} className="font-psemibold">
            {user.username}
          </Text>
          {location && (
            <View className="flex-row items-center space-x-1">
              <Ionicons name="location" size={hp(1.5)} color="black" />
              <Text
                style={{ fontSize: hp(1.5) }}
                className="font-pregular mt-[1px]"
              >
                {location.city + ", " + location.country}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Text className="font-psemibold mb-2" style={{ fontSize: hp(2.5) }}>
        Upload Image
      </Text>
      {form.image ? (
        <Image
          source={{ uri: form.image }}
          className="w-full h-56 rounded-lg"
          contentFit="cover"
        />
      ) : (
        <TouchableOpacity
          onPress={pickImage}
          className="w-full h-56 rounded-lg bg-blue-500 items-center justify-center"
        >
          <Ionicons name="add" size={hp(7)} color={"white"} />
        </TouchableOpacity>
      )}

      <View className="my-4">
        <Text className="font-psemibold text-xl mb-2">Caption</Text>
        <TextInput
          numberOfLines={7}
          value={form.caption}
          className="bg-white rounded-lg p-4 text-md"
          placeholder="What's on your mind?"
          style={{ textAlignVertical: "top" }}
          onChangeText={(e) => setForm({ ...form, caption: e })}
        />
      </View>
    </ScrollView>
  );
};

export default post;
