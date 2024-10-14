import { rapidApiKey } from "../constants";
import axios from "axios";
const baseUrl = "https://exercisedb.p.rapidapi.com";

const apiCall = async (url, params) => {
  try {
    const options = {
      methods: "GET",
      url,
      params,
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export const fetchExercisesByBodyPart = async (bodypart) => {
  let data = await apiCall(baseUrl + `/exercises/bodyPart/${bodypart}`);

  return data;
};
