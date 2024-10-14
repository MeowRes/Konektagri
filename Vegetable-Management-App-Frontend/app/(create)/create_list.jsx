import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { request } from "../../lib/Require";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useRoute } from "@react-navigation/native";

const CreateList = () => {
  const { params } = useRoute();
  // Initialize form state with params or default to null
  const [form, setForm] = useState({
    farmer_id: parseInt(params.farmer_id) || null,
    ac_id: parseInt(params.ac_id) || null,
    df_id: parseInt(params.df_id) || null,
    address_id: parseInt(params.address_id) || null,
  });
  const [farmer, setFarmer] = useState([]);
  const [ac, setAC] = useState([]);
  const [address, setAddress] = useState([]);
  const [df, setDF] = useState([]);
  const { accessToken } = useGlobalContext();

  // Fetch data when the component is mounted
  useEffect(() => {
    getFarmerData();
    getACData();
    getAddressData();
    getDFData();
  }, []);

  const ResetData = () => {
    setForm({
      farmer_id: null,
      ac_id: null,
      df_id: null,
      address_id: null,
    });
  };

  const getFarmerData = async () => {
    try {
      const response = await request("farmer/get", "get", {}, accessToken);
      if (response.data) {
        setFarmer(response.data);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const getACData = async () => {
    try {
      const response = await request("ac/get", "get", {}, accessToken);
      if (response.data) {
        setAC(response.data);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const getDFData = async () => {
    try {
      const response = await request("df/get", "get", {}, accessToken);
      if (response.data) {
        setDF(response.data);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const getAddressData = async () => {
    try {
      const response = await request("address/get", "get", {}, accessToken);
      if (response.data) {
        setAddress(response.data);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSubmitStep1 = async () => {
    if (!form.farmer_id || form.farmer_id === null) {
      Alert.alert("Required", "Please select a farmer!");
      return;
    }
    if (!form.ac_id || form.ac_id === null) {
      Alert.alert("Required", "Please select an agriculture cooperative!");
      return;
    }
    if (!form.df_id || form.df_id === null) {
      Alert.alert("Required", "Please select a district facilitator!");
      return;
    }
    if (!form.address_id || form.address_id === null) {
      Alert.alert("Required", "Please select an address!");
      return;
    }

    router.push({
      pathname: "/next_list",
      params: {
        farmer_id: form.farmer_id,
        ac_id: form.ac_id,
        df_id: form.df_id,
        address_id: form.address_id,
        vegetable_detail_id: params.vegetable_detail_id || null,
        vegetable_processing_id: params.vegetable_processing_id || null,
        vegetable_id: params.vegetable_id || null,
        vegetable_growing: params.vegetable_growing || "",
        land_vegetable_cultivation: params.land_vegetable_cultivation || "",
        date_of_seeding: params.date_of_seeding || "",
        date_of_planting: params.date_of_planting || "",
        date_of_harvesting: params.date_of_harvesting || "",
        estimated_product: params.estimated_product || "",
        type: params.type || "",
      },
    });
  };

  return (
    <View className="flex-1 bg-green-700 p-4">
      <View className="mt-6 w-full">
        <Text className="font-psemibold text-lg text-white">Farmer</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={form.farmer_id}
            onValueChange={(prev) => {
              if (prev === "create-new-farmer") {
                router.replace("/farmer");
                ResetData();
              } else {
                setForm({ ...form, farmer_id: prev });
              }
            }}
          >
            <Picker.Item label="Select a farmer" value={null} />
            {farmer &&
              farmer.map((item) => (
                <Picker.Item
                  key={item.farmer_id}
                  label={`${item.first_name} ${item.last_name}`}
                  value={item.farmer_id}
                />
              ))}
            <Picker.Item label="Create New Farmer" value="create-new-farmer" />
          </Picker>
        </View>
      </View>

      <View className="mt-8 w-full">
        <Text className="font-psemibold text-lg text-white">
          Agriculture Cooperative
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={form.ac_id}
            onValueChange={(prev) => {
              if (prev === "create-new-ac") {
                router.replace("/ac");
                ResetData();
              } else {
                setForm({ ...form, ac_id: prev });
              }
            }}
          >
            <Picker.Item
              label="Select an Agriculture Cooperative"
              value={null}
            />
            {ac &&
              ac.map((item) => (
                <Picker.Item
                  key={item.ac_id}
                  label={`${item.first_name} ${item.last_name}`}
                  value={item.ac_id}
                />
              ))}
            <Picker.Item
              label="Create New Agriculture Cooperative"
              value="create-new-ac"
            />
          </Picker>
        </View>
      </View>

      <View className="mt-8 w-full">
        <Text className="font-psemibold text-lg text-white">
          District Facilitate
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={form.df_id}
            onValueChange={(prev) => {
              if (prev === "create-new-df") {
                router.replace("/df");
                ResetData();
              } else {
                setForm({ ...form, df_id: prev });
              }
            }}
          >
            <Picker.Item label="Select a District Facilitate" value={null} />
            {df &&
              df.map((item) => (
                <Picker.Item
                  key={item.df_id}
                  label={item.df_name}
                  value={item.df_id}
                />
              ))}
            <Picker.Item
              label="Create New District Facilitate"
              value="create-new-df"
            />
          </Picker>
        </View>
      </View>

      <View className="mt-8 w-full">
        <Text className="font-psemibold text-lg text-white">Address</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={form.address_id}
            onValueChange={(prev) => {
              if (prev === "create-new-address") {
                router.replace("/address");
                ResetData();
              } else {
                setForm({ ...form, address_id: prev });
              }
            }}
          >
            <Picker.Item label="Select an Address" value={null} />
            {address &&
              address.map((item) => (
                <Picker.Item
                  key={item.address_id}
                  label={`${item.village}, ${item.commune}, ${item.district}, ${item.province}`}
                  value={item.address_id}
                />
              ))}
            <Picker.Item
              label="Create New Address"
              value="create-new-address"
            />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        className="w-full h-14 bg-green-500 mt-7 px-4 rounded-lg justify-center items-center"
        onPress={handleSubmitStep1}
      >
        <Text className="text-white text-lg font-psemibold mt-1">Next</Text>
      </TouchableOpacity>
    </View>
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

export default CreateList;
