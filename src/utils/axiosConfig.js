import axiosOriginal from "axios";

const axios = axiosOriginal.create({
  baseURL: "http://localhost:5000/",
  withCredentials: false,
});


axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
