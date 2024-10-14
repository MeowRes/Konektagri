import axios from "axios";
import { Alert } from "react-native";
const config = "http://10.0.2.2:8080/api/";
export const request = (url, method, data, accessToken) => {
  var headers = { "Content-Type": "application/json" };
  if (data instanceof FormData) {
    //Check if param data is FormData
    headers = { "Content-Type": "multipart/form-data" };
  }
  return axios({
    method: method,
    url: config + url,
    data: data,
    headers: {
      ...headers,
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => res.data)
    .catch((error) => {
      const status = error.response?.status;
      console.log("API Requested fail!", error);
      if (status == 401) {
        Alert.alert(
          "Server Error",
          "You don't have permission access this method!"
        );
      }
    });
};
