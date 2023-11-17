import { CommonConfigs } from "@/src/constants/appConfigs";
import ax, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { RequestCheckoutPaymentSession } from "../types/post-checkout.type";
import { auth } from "../Auth/firebase";

const baseUrl: string = CommonConfigs.baseUrl as string;
const axios: AxiosInstance = ax.create();

axios.interceptors.request.use(
  async (configs: InternalAxiosRequestConfig<any>) => {
    const token: string = (await auth.currentUser?.getIdToken()) as string;

    configs.headers["Authorization"] = "Bearer " + token;
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

// stripe endpoints
export function getPaymentHistory(path: string, config?: AxiosRequestConfig) {
  return axios.get(baseUrl + path, config);
}

// checkout-payment-session
export function postCheckoutPaymentSession(path: string, body: RequestCheckoutPaymentSession, config?: AxiosRequestConfig) {
  return axios.post(baseUrl + path, body, config);
}
