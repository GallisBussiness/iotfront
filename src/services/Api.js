import axios from "axios";
import { env } from "../components/env";
const Api = axios.create({
    baseURL: env.baseServerURL,
  })
  Api.interceptors.request.use(config => {
    const token = window.localStorage.getItem(env.tokenStorageName);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  })
export default Api;