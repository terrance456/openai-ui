import { CommonConfigs } from "@/src/constants/appConfigs";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const baseUrl: string = CommonConfigs.baseUrl as string;

axios.interceptors.request.use(
  (configs: InternalAxiosRequestConfig<any>) => {
    configs.headers["Authorization"] = "Bearer " + localStorage.getItem("secret");
    return configs;
  },
  (error) => {
    Promise.reject(error);
  }
);

export function postImageQuery(path: string, data?: any, config?: AxiosRequestConfig) {
  return axios.post(baseUrl + path, data, config);
}
