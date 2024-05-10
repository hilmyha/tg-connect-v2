import axiosLib from "axios";
import { getToken } from "../services/TokenService";

const axios = axiosLib.create({
  baseURL: "http://10.0.2.2:8000/api/",
  headers: {
    Accept: "application/json",
  },
});

const axiosFile = axiosLib.create({
  baseURL: "http://10.0.2.2:8000/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

axios.interceptors.request.use(async (req) => {
  const token = await getToken();

  if (token !== null) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

axiosFile.interceptors.request.use(async (req) => {
  const token = await getToken();

  if (token !== null) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default axios;
export { axiosFile };
