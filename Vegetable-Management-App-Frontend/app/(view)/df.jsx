import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { request } from "../../lib/Require";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const StyledView = styled(View);
const StyledText = styled(Text);

const DF = () => {
  const [openModal, setOpenModal] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [formCreate, setFormCreate] = useState({
    df_name: "",
    address_id: null,
    df_id: null,
  });
  const [address, setAddress] = useState([]);
  const [tableData, setTableData] = useState([]);
  const { accessToken } = useGlobalContext();
  const tableHead = [
    "No.",
    "DF Name",
    "Village",
    "Commune",
    "District",
    "Province",
    "Update",
  ];

  useEffect(() => {
    getDFData();
    getAddressData();
  }, []);

  const ResetData = () => {
    setOpenModal(false);
    setUpdateBtn(false);
    setFormCreate({
      df_name: "",
      address_id: null,
      df_id: null,
    });
  };

  const getDFData = async () => {
    const response = await request("df/get", "get",{},accessToken);
    if (response.data) {
      setTableData(response.data);
    }
  };

  const getAddressData = async () => {
    const response = await request("address/get", "get",{},accessToken);
    if (response.data) {
      setAddress(response.data);
    }
  };
  const handleUpdateForm = async () => {
    try {
      const response = await request("df/update", "put", {
        df_name: formCreate.df_name,
        address_id: formCreate.address_id,
        df_id: formCreate.df_id,
      },accessToken);
      if (response) {
        getDFData();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      ResetData();
    }
  };

  const handleCreateform = async () => {
    try {
      const response = await request("df/create", "post", {
        df_name: formCreate.df_name,
        address_id: formCreate.address_id,
      },accessToken);
      if (response) {
        getDFData();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      ResetData();
    }
  };

  return (
    <ScrollView horizontal={true}>
      <Modal visible={openModal} transparent={true}>
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View className="w-[90%] p-4 bg-white rounded-lg">
            <View className="flex-row justify-between items-center">
              <Text className=" font-psemibold text-lg text-center">
                {updateBtn ? "Update DF" : "Create New DF"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  ResetData();
                }}
              >
                <Ionicons
                  name="close-circle-sharp"
                  size={hp(4)}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View className="gap-y-2 flex-col mt-4">
              <Text className=" font-psemibold text-lg">
                District Facilitate Name
              </Text>
              <TextInput
                value={formCreate.df_name}
                onChangeText={(prev) =>
                  setFormCreate({ ...formCreate, df_name: prev })
                }
                placeholderTextColor={"gray"}
                placeholder="Enter your first name..."
                className="w-full border border-gray-500 px-4 py-3 rounded-xl text-md"
              />
            </View>
            <View className="gap-y-2 flex-col mt-4">
              <Text className=" font-psemibold text-lg">Address</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={formCreate.address_id}
                  onValueChange={(prev) => {
                    if (prev == "create-new") {
                      ResetData();
                      router.replace("/address");
                    }
                    setFormCreate({ ...formCreate, address_id: prev });
                  }}
                >
                  <Picker.Item label="Select an address..." value="" />
                  {address.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={
                        item.village +
                        "," +
                        item.commune +
                        "," +
                        item.district +
                        "," +
                        item.province
                      }
                      value={item.address_id}
                    />
                  ))}
                  <Picker.Item
                    label="Create New Address..."
                    value="create-new"
                  />
                </Picker>
              </View>
            </View>
            {updateBtn ? (
              <TouchableOpacity
                className="w-full bg-green-500 rounded-xl py-3 mt-10 items-center"
                onPress={handleUpdateForm}
              >
                <Text
                  className="font-psemibold text-white"
                  style={{ fontSize: hp(2) }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="w-full bg-green-500 rounded-xl py-3 mt-10 items-center"
                onPress={handleCreateform}
              >
                <Text
                  className="font-psemibold text-white"
                  style={{ fontSize: hp(2) }}
                >
                  Create
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
      <StyledView className="flex-1 bg-green-700 py-4 relative">
        <StyledView style={styles.table}>
          <StyledView style={styles.headerRow} className="bg-green-500">
            {tableHead.map((head, index) => (
              <StyledText
                key={index}
                style={[styles.cell, { fontSize: hp(1.8) }]}
                className="text-center font-psemibold"
              >
                {head}
              </StyledText>
            ))}
          </StyledView>
          {tableData.map((rowData, rowIndex) => (
            <StyledView key={rowIndex} style={styles.row}>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                {rowIndex + 1}
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                {rowData.df_name}
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                {rowData.village}
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                {rowData.commune}
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                {rowData.district}
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                <View>
                  <Text>{rowData.province}</Text>
                </View>
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                <TouchableOpacity
                  onPress={() => {
                    setFormCreate({
                      df_name: rowData.df_name,
                      address_id: rowData.address_id,
                      df_id: rowData.df_id,
                    });
                    setOpenModal(true);
                    setUpdateBtn(true);
                  }}
                  className="p-1 bg-yellow-500 rounded-xl justify-center items-center"
                >
                  <AntDesign name="edit" size={hp(3)} color="white" />
                </TouchableOpacity>
              </StyledText>
            </StyledView>
          ))}
        </StyledView>
        <TouchableOpacity
          onPress={() => setOpenModal(true)}
          className="absolute bottom-4 left-4"
        >
          <Ionicons name="create-outline" size={hp(5)} color="white" />
        </TouchableOpacity>
      </StyledView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: "#C1C0B9",
  },
  headerRow: {
    flexDirection: "row",
    // backgroundColor: "yellow",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: wp(30),
    minHeight: hp(6),
    borderRightWidth: 1,
    borderColor: "#C1C0B9",
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 2,
    fontSize: hp(1.5),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#9ca3cf",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "gray",
  },
  pickerItem: {
    color: "gray",
    fontSize: 16,
  },
});

export default DF;
