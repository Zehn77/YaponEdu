import axios from "axios";
import { signOut } from "../../store/authSlice";
import store from "./../../store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_KEY,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      store.dispatch(signOut());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
