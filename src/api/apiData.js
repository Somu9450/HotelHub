import axios from "axios";

const HOTELS_BASE_URL = "https://demohotelsapi.pythonanywhere.com";

const hotelApi = axios.create({
  baseURL: HOTELS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getHotelsData = async () => {
  try {
    const response = await hotelApi.get("/hotels/")
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log("Error fetching hotels:", error);
    return [];
  }
};
