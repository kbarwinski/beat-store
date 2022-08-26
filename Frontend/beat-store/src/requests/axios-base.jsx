import axios from "axios";
import { store } from "../store/store";

const axiosBase = axios.create({
  baseURL: "https://192.168.0.3:7056/api",
  timeout: 10000,
});

axiosBase.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + store.getState().auth.jwtToken;
  return config;
});

export default axiosBase;
