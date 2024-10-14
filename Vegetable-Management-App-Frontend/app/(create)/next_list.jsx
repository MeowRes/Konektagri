import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { request } from "../../lib/Require";
import moment from "moment";
import { useGlobalContext } from "../../context/GlobalProvider";
const NextList = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [vegetable, setVegetable] = useState([]);
  const [date_of_seeding, setDateOfSeeding] = useState(new Date());
  const [date_of_planting, setDateOfPlanting] = useState(new Date());
  const [date_of_harvesting, setDateOfHarvesting] = useState(new Date());
  const { params } = useRoute();
  const [form, setForm] = useState({
    farmer_id: params?.farmer_id,
    ac_id: params?.ac_id,
    address_id: params?.address_id,
    df_id: params?.df_id,
    vegetable_id: parseInt(params?.vegetable_id) || null,
    vegetable_growing: params?.vegetable_growing || "",
    land_vegetable_cultivation: params?.land_vegetable_cultivation || "",
    date_of_seeding: params.date_of_seeding || "",
    date_of_planting: params.date_of_planting || "",
    date_of_harvesting: params.date_of_harvesting || "",
    estimated_product: params.estimated_product || "",
  });
  const { accessToken } = useGlobalContext();
  useEffect(() => {
    // console.log(params);
    getVegetableData();
  }, []);
  const getVegetableData = async () => {
    const response = await request("vegetable/get", "get", {}, accessToken);
    if (response.data) {
      setVegetable(response.data);
    }
  };
  const handleChangeDate = (key, value) => {
    setForm({
      ...form,
      [key]: moment(value).format("YYYY-MM-DD"),
    });
  };
  const handleSubmitData = async () => {
    try {
      if (!form.vegetable_id || form.vegetable_id === null) {
        Alert.alert("Required", "Please Select a Vegetable!");
        return;
      }
      if (!form.vegetable_growing || form.vegetable_growing === "") {
        Alert.alert("Required", "Please Select a Vegetable Growing!");
        return;
      }
      if (!form.date_of_seeding || form.date_of_seeding === "") {
        Alert.alert("Required", "Please Select a Date of Seeding!");
        return;
      }
      if (!form.date_of_planting || form.date_of_planting === "") {
        Alert.alert("Required", "Please Select a Date of Planting!");
        return;
      }
      if (!form.date_of_harvesting || form.date_of_harvesting === "") {
        Alert.alert("Required", "Please Select a Date of Harvesting!");
        return;
      }
      if (
        !form.land_vegetable_cultivation ||
        form.land_vegetable_cultivation === ""
      ) {
        Alert.alert("Required", "Please Enter the Land Cultivation!");
        return;
      }
      if (!form.estimated_product || form.estimated_product === "") {
        Alert.alert("Required", "Please Enter the Estimated Product!");
        return;
      }
      const vegetable_process = await request(
        "vegetable_processing/create",
        "post",
        {
          vegetable_id: form.vegetable_id,
          vegetable_growing: form.vegetable_growing,
          land_vegetable_cultivation: form.land_vegetable_cultivation,
          date_of_seeding: form.date_of_seeding,
          date_of_planting: form.date_of_planting,
          date_of_harvesting: form.date_of_harvesting,
          estimated_product: form.estimated_product,
        },
        accessToken
      );
      if (vegetable_process && vegetable_process.data) {
        const response = await request(
          "vegetable_detail/create",
          "post",
          {
            farmer_id: form.farmer_id,
            ac_id: form.ac_id,
            df_id: form.df_id,
            address_id: form.address_id,
            vegetable_processing_id:
              vegetable_process.data.vegetable_processing_id,
          },
          accessToken
        );
        if (response) {
          router.replace("/overview_data");
        } else {
          Alert.alert("Error", "Insert data to Vegetable Detail was fail!");
        }
      } else {
        Alert.alert("Error", "Insert data to Vegetable Processing was fail!");
      }
    } catch (error) {
      Alert.alert("Error", error);
    }
  };
  const handleUpdateData = async () => {
    const updatedVegetaleDetail = await request(
      "vegetable_detail/update",
      "put",
      {
        farmer_id: form.farmer_id,
        ac_id: form.ac_id,
        df_id: form.df_id,
        address_id: form.address_id,
        vegetable_processing_id: parseInt(params.vegetable_processing_id),
        vegetable_detail_id: parseInt(params.vegetable_detail_id),
        vegetable_id: form.vegetable_id,
        vegetable_growing: form.vegetable_growing,
        land_vegetable_cultivation: form.land_vegetable_cultivation,
        date_of_seeding: moment(form.date_of_seeding).format("YYYY-MM-DD"),
        date_of_planting: moment(form.date_of_planting).format("YYYY-MM-DD"),
        date_of_harvesting: moment(form.date_of_harvesting).format(
          "YYYY-MM-DD"
        ),
        estimated_product: form.estimated_product,
      },
      accessToken
    );
    if (updatedVegetaleDetail) {
      Alert.alert("Update", "Update Data Successfully!", [
        {
          text: "Okay",
          onPress: () => router.replace("/dashboard"),
        },
      ]);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-green-700 px-2 py-4 ">
      <ScrollView>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back-sharp"
              size={heightPercentageToDP(3)}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{ fontSize: heightPercentageToDP(2.8) }}
          className="mt-4 font-psemibold text-white"
        >
          Processing of Vegetables
        </Text>
        <View className="flex-row justify-between gap-x-2 mt-12">
          <View className="flex-1">
            <Text className=" font-psemibold text-md text-white">
              Vegetable Name
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={form.vegetable_id}
                onValueChange={(prev) => {
                  if (prev === "create-new-vegetable") {
                    router.replace("/vegetable");
                  } else {
                    setForm({ ...form, vegetable_id: prev });
                  }
                }}
              >
                <Picker.Item label="Select a vegetable name" value="" />
                {vegetable &&
                  vegetable.map((item) => {
                    return (
                      <Picker.Item
                        key={item.vegetable_id}
                        label={item.vegetable_name}
                        value={item.vegetable_id}
                      />
                    );
                  })}
                <Picker.Item
                  label="Create New Vegetable"
                  value="create-new-vegetable"
                />
              </Picker>
            </View>
          </View>
          <View className="flex-1">
            <Text className=" font-psemibold text-md text-white">
              Vegetable Growing
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={form.vegetable_growing}
                onValueChange={(prev) => {
                  setForm({ ...form, vegetable_growing: prev });
                }}
              >
                <Picker.Item label="Select a vegetable growing" value="" />
                <Picker.Item label="Open Field" value="Open Field" />
                <Picker.Item label="Green House" value="Green House" />
              </Picker>
            </View>
          </View>
        </View>
        <View className="flex-row justify-between gap-x-2 mt-8">
          <View className="flex-1">
            <Text className="font-psemibold text-white text-md">
              Date of Seeding
            </Text>
            <TouchableOpacity
              className="w-full h-14 border-[1px] border-white px-4 rounded-lg flex-row items-center"
              onPress={() => {
                setShowDatePicker(!showDatePicker);
                setSelectedDateType("date_of_seeding");
              }}
            >
              <Text className="text-white">
                {form.date_of_seeding
                  ? moment(form.date_of_seeding).format("YYYY-MM-DD")
                  : "Selete a date of seeding"}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <Text className="font-psemibold text-white text-md">
              Date of Planting
            </Text>
            <TouchableOpacity
              className="w-full h-14 border-[1px] border-white px-4 rounded-lg flex-row items-center"
              onPress={() => {
                setShowDatePicker(!showDatePicker);
                setSelectedDateType("date_of_planting");
              }}
            >
              <Text className="text-white">
                {form.date_of_planting
                  ? moment(form.date_of_planting).format("YYYY-MM-DD")
                  : "Selete a date of planting"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-between gap-x-2 mt-8">
          <View className="flex-1">
            <Text className="font-psemibold text-white text-md">
              Date of harvesting
            </Text>
            <TouchableOpacity
              className="w-full h-14 border-[1px] border-white px-4 rounded-lg flex-row items-center"
              onPress={() => {
                setShowDatePicker(!showDatePicker);
                setSelectedDateType("date_of_harvesting");
              }}
            >
              <Text className="text-white">
                {form.date_of_harvesting
                  ? moment(form.date_of_harvesting).format("YYYY-MM-DD")
                  : "Selete a date of harvesting"}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <Text className="font-psemibold text-white text-md">
              Land Cultivation
            </Text>
            <TextInput
              value={form.land_vegetable_cultivation}
              onChangeText={(prev) =>
                setForm({ ...form, land_vegetable_cultivation: prev })
              }
              className="w-full border border-white flex-1 px-4 rounded-xl text-md text-white"
            />
          </View>
        </View>
        <View className="mt-8">
          <Text className=" font-psemibold text-white text-md">
            Estimated Product
          </Text>
          <TextInput
            value={form.estimated_product}
            onChangeText={(prev) =>
              setForm({ ...form, estimated_product: prev })
            }
            className="w-full h-14 border border-white px-4 rounded-xl text-md text-white"
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={
              selectedDateType === "date_of_seeding"
                ? date_of_seeding
                : selectedDateType === "date_of_planting"
                ? date_of_planting
                : date_of_harvesting
            }
            display="spinner"
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                handleChangeDate(selectedDateType, selectedDate);
              }
            }}
          />
        )}
        {params.type == "Update" ? (
          <TouchableOpacity
            className="w-full h-14 bg-green-500 mt-7 px-4 rounded-lg justify-center items-center"
            onPress={handleUpdateData}
          >
            <Text className="text-white text-lg font-psemibold mt-1">
              Update
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="w-full h-14 bg-green-500 mt-7 px-4 rounded-lg justify-center items-center"
            onPress={handleSubmitData}
          >
            <Text className="text-white text-lg font-psemibold mt-1">
              Create
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    color: "white",
  },
  pickerItem: {
    color: "white",
    fontSize: 14,
  },
});
export default NextList;
