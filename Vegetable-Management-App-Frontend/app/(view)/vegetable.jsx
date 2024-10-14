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

const Vegetable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [formCreate, setFormCreate] = useState({
    vegetable_name: "",
    vegetable_id: null,
  });
  const [tableData, setTableData] = useState([]);
  const tableHead = ["No.", "Vegetable Name", "Update"];
  const { accessToken } = useGlobalContext();

  useEffect(() => {
    getVegetableData();
  }, []);

  const ResetData = () => {
    setOpenModal(false);
    setUpdateBtn(false);
    setFormCreate({
      vegetable_name: "",
      vegetable_id: null,
    });
  };

  const getVegetableData = async () => {
    const response = await request("vegetable/get", "get",{},accessToken);
    if (response.data) {
      setTableData(response.data);
    }
  };
  const handleUpdateForm = async () => {
    try {
      const response = await request("vegetable/update", "put", {
        vegetable_name: formCreate.vegetable_name,
        vegetable_id: formCreate.vegetable_id,
      },accessToken);
      if (response) {
        getVegetableData();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      ResetData();
    }
  };

  const handleCreateform = async () => {
    try {
      const response = await request("vegetable/create", "post", {
        vegetable_name: formCreate.vegetable_name,
      },accessToken);
      if (response) {
        getVegetableData();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      ResetData();
    }
  };

  return (
    <View className="flex-1 bg-green-700 relative">
      <TouchableOpacity
        onPress={() => setOpenModal(true)}
        className=" absolute bottom-4 left-4 z-10"
      >
        <Ionicons name="create-outline" size={hp(5)} color="white" />
      </TouchableOpacity>
      <ScrollView>
        <Modal visible={openModal} transparent={true}>
          <View
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <View className="w-[90%] p-4 bg-white rounded-lg">
              <View className="flex-row justify-between items-center">
                <Text className=" font-psemibold text-lg text-center">
                  {updateBtn ? "Update Vegetable" : "Create New Vegetable"}
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
                <Text className=" font-psemibold text-lg">Vegetable Name</Text>
                <TextInput
                  value={formCreate.vegetable_name}
                  onChangeText={(prev) =>
                    setFormCreate({ ...formCreate, vegetable_name: prev })
                  }
                  placeholderTextColor={"gray"}
                  placeholder="Enter your vegetable name..."
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
        <StyledView className="flex-1 py-4">
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
                  {rowData.vegetable_name}
                </StyledText>
                <StyledText
                  style={styles.cell}
                  className="text-center bg-green-300 "
                >
                  <TouchableOpacity
                    onPress={() => {
                      setFormCreate({
                        vegetable_id: rowData.vegetable_id,
                        vegetable_name: rowData.vegetable_name,
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
        </StyledView>
      </ScrollView>
    </View>
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

export default Vegetable;
