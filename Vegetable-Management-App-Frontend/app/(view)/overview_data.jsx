import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { styled } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { request } from "../../lib/Require";
import { router } from "expo-router";
import moment from "moment";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Picker } from "@react-native-picker/picker";

const StyledView = styled(View);
const StyledText = styled(Text);

const Overview = () => {
  const [tableData, setTableData] = useState([]);
  const { accessToken } = useGlobalContext();
  const tableHead = [
    "No.",
    "Farmer Name",
    "Village",
    "Commune",
    "District",
    "Province",
    "Agriculture Cooperative",
    "District Facilitate",
    "Vegetable Growing",
    "Vegetable",
    "Land Cultivation",
    "Date Of Seeding",
    "Date Of Planting",
    "Date Of Harvesting",
    "Estimate Product",
    "Action",
  ];

  useEffect(() => {
    getOverviewData();
  }, []);
  const getOverviewData = async () => {
    const response = await request(
      "vegetable_detail/get",
      "get",
      {},
      accessToken
    );
    if (response.data) {
      setTableData(response.data);
    }
  };
  return (
    <ScrollView horizontal={true}>
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
                {rowData.first_name + " " + rowData.last_name}
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
                <View>
                  <Text>
                    {rowData.ac_first_name + " " + rowData.ac_last_name}
                  </Text>
                </View>
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                <View>
                  <Text>{rowData.df_name}</Text>
                </View>
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                <View>
                  <Text>{rowData.vegetable_growing}</Text>
                </View>
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                <View>
                  <Text>{rowData.vegetable_name}</Text>
                </View>
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                <View>
                  <Text>{rowData.land_vegetable_cultivation}</Text>
                </View>
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                <View>
                  <Text>
                    {moment(rowData.date_of_seeding).format("YYYY-MM-DD")}
                  </Text>
                </View>
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                <View>
                  <Text>
                    {moment(rowData.date_of_planting).format("YYYY-MM-DD")}
                  </Text>
                </View>
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                <View>
                  <Text>
                    {moment(rowData.date_of_harvesting).format("YYYY-MM-DD")}
                  </Text>
                </View>
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 "
              >
                <View>
                  <Text>{rowData.estimated_product}</Text>
                </View>
              </StyledText>
              <StyledText
                style={styles.cell}
                className="text-center bg-green-300 flex-row gap-x-2"
              >
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "create_list",
                      params: {
                        farmer_id: rowData.farmer_id,
                        ac_id: rowData.ac_id,
                        df_id: rowData.df_id,
                        address_id: rowData.address_id,
                        vegetable_detail_id: rowData.vegetable_detail_id,
                        vegetable_processing_id:
                          rowData.vegetable_processing_id,
                        vegetable_id: rowData.vegetable_id,
                        vegetable_growing: rowData.vegetable_growing,
                        land_vegetable_cultivation:
                          rowData.land_vegetable_cultivation,
                        date_of_seeding: rowData.date_of_seeding,
                        date_of_planting: rowData.date_of_planting,
                        date_of_harvesting: rowData.date_of_harvesting,
                        estimated_product: rowData.estimated_product,
                        type: "Update",
                      },
                    });
                  }}
                  className="p-1 rounded-xl justify-center items-center"
                >
                  <AntDesign name="edit" size={hp(3)} color={"#ee9b00"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Delete",
                      "Are you sure you want to remove this data?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Ok",
                          onPress: async () => {
                            await request(
                              "vegetable_detail/delete",
                              "delete",
                              {
                                vegetable_detail_id:
                                  rowData.vegetable_detail_id,
                                vegetable_processing_id:
                                  rowData.vegetable_processing_id,
                              },
                              accessToken
                            );
                            getOverviewData();
                          },
                        },
                      ],
                      { cancelable: true }
                    );
                  }}
                  className="p-[5px] rounded-xl justify-center items-center"
                >
                  <AntDesign name="delete" size={hp(3)} color="red" />
                </TouchableOpacity>
              </StyledText>
            </StyledView>
          ))}
        </StyledView>
        <TouchableOpacity
          onPress={() => router.push("/create_list")}
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

export default Overview;
