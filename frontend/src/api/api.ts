import axios from "axios";

const API_URL = "http://localhost:3000";

export const identifyUser = async (data: {
  email?: string;
  phoneNumber?: string;
}) => {
  const response = await axios.post(`${API_URL}/identify`, data);
  return response.data;
};