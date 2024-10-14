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
import { useGlobalContext } from "../../context/GlobalProvider";
const StyledView = styled(View);
const StyledText = styled(Text);

const Address = () => {
  const [openModal, setOpenModal] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [formCreate, setFormCreate] = useState({
    village: "",
    commune: "",
    address_id: null,
    district: "",
    province: "",
  });
  const { accessToken } = useGlobalContext();
  const [address, setAddress] = useState([]);
  const tableHead = [
    "No.",
    "Village",
    "Commune",
    "District",
    "Province",
    "Update",
  ];
  useEffect(() => {
    getAddressData();
  }, []);
  const ResetData = () => {
    setOpenModal(false);
    setUpdateBtn(false);
    setFormCreate({
      village: "",
      commune: "",
      address_id: null,
      district: null,
      province: "",
    });
  };
  const getAddressData = async () => {
    const response = await request("address/get", "get", {}, accessToken);
    if (response.data) {
      setAddress(response.data);
    }
  };
  const handleUpdateForm = async () => {
    try {
      const response = await request(
        "address/update",
        "put",
        {
          village: formCreate.village,
          commune: formCreate.commune,
          address_id: formCreate.address_id,
          district: formCreate.district,
          province: formCreate.province,
        },
        accessToken
      );
      if (response) {
        getAddressData();
      }
    } catch (error) {
      Alert.alert("Error", error);
    } finally {
      ResetData();
    }
  };
  const handleCreateform = async () => {
    try {
      const response = await request(
        "address/create",
        "post",
        {
          village: formCreate.village,
          commune: formCreate.commune,
          district: formCreate.district,
          province: formCreate.province,
        },
        accessToken
      );
      if (response) {
        getAddressData();
      }
    } catch (error) {
      Alert.alert("Erorr", error);
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
                {updateBtn ? "Update Address" : "Create New Address"}
              </Text>
              <TouchableOpacity onPress={() => ResetData()}>
                <Ionicons
                  name="close-circle-sharp"
                  size={hp(4)}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View className="gap-y-2 flex-col mt-4">
              <Text className=" font-psemibold text-lg">Village</Text>
              <TextInput
                value={formCreate.village}
                onChangeText={(prev) =>
                  setFormCreate({ ...formCreate, village: prev })
                }
                placeholderTextColor={"gray"}
                placeholder="Enter your first name..."
                className="w-full border border-gray-500 px-4 py-3 rounded-xl text-md"
              />
            </View>
            <View className="gap-y-2 flex-col mt-4">
              <Text className=" font-psemibold text-lg">Commune</Text>
              <TextInput
                value={formCreate.commune}
                onChangeText={(prev) =>
                  setFormCreate({ ...formCreate, commune: prev })
                }
                placeholderTextColor={"gray"}
                placeholder="Enter your last name..."
                className="w-full border border-gray-500 px-4 py-3 rounded-xl text-md"
              />
            </View>
            <View className="gap-y-2 flex-col mt-4">
              <Text className=" font-psemibold text-lg">District</Text>
              <TextInput
                value={formCreate.district}
                onChangeText={(prev) =>
                  setFormCreate({ ...formCreate, district: prev })
                }
                placeholderTextColor={"gray"}
                placeholder="Enter your first name..."
                className="w-full border border-gray-500 px-4 py-3 rounded-xl text-md"
              />
            </View>
            <View className="gap-y-2 flex-col mt-4">
              <Text className=" font-psemibold text-lg">Province</Text>
              <TextInput
                value={formCreate.province}
                onChangeText={(prev) =>
                  setFormCreate({ ...formCreate, province: prev })
                }
                placeholderTextColor={"gray"}
                placeholder="Enter your first name..."
                className="w-full border border-gray-500 px-4 py-3 rounded-xl text-md"
              />
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
          {address.map((rowData, rowIndex) => (
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
                className=" text-center bg-green-300 "
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
                      village: rowData.village,
                      commune: rowData.commune,
                      address_id: rowData.address_id,
                      district: rowData.district,
                      province: rowData.province,
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
});

export default Address;
