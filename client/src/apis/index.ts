import { CommonConfigs } from "@/src/constants/appConfigs";
import ax, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { RequestCheckoutPaymentSession } from "../types/post-checkout.type";

const baseUrl: string = CommonConfigs.baseUrl as string;
const axios: AxiosInstance = ax.create();

axios.interceptors.request.use(
  (configs: InternalAxiosRequestConfig<any>) => {
    configs.headers["Authorization"] = "Bearer " + localStorage.getItem("secret");
    return configs;
  },
  (error) => {
    Promise.reject(error);
  }
);

// open-ai endpoints
export function postImageQuery(path: string, data?: any, config?: AxiosRequestConfig) {
  return axios.post(baseUrl + path, data, config);
}

// firebase endpoints
export function getUserCredits(path: string, config?: AxiosRequestConfig) {
  return axios.get(baseUrl + path, config);
}

// firebase endpoints
export function getImagesIds(path: string, config?: AxiosRequestConfig) {
  return axios.get(baseUrl + path, config);
}

// checkout-payment-session
export function postCheckoutPaymentSession(path: string, body: RequestCheckoutPaymentSession, config?: AxiosRequestConfig) {
  return axios.post(baseUrl + path, body, config);
}
