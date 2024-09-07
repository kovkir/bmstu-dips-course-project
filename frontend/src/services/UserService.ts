import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { IAuthResponse } from "../interfaces/Auth/IAuthResponse";
import { IUser } from "../interfaces/User/IUser";
import { config } from "../config";


axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['WWW-Authenticate'] = 'Negotiate';

const $apiAuth = axios.create({
  baseURL: 
		`http://${config.server.auth.host}:${config.server.auth.port}/api/v1/`,
});
const $apiUser = axios.create({
  baseURL: 
		`http://${config.server.auth.host}:${config.server.auth.port}/api/v1/`,
});


$apiUser.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  return config;
});

$apiUser.interceptors.response.use((config: AxiosResponse) => {
  return config;
}, (async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const data = {
        "refresh_token": localStorage.getItem("refreshToken"),
      };
      const response = await $apiAuth.post<IAuthResponse>(`/user/refresh/`, data).catch(_ => {
        localStorage.clear();
      });
      
      if (response) {
        localStorage.setItem("accessToken", response.data.access_token as string);
        return $apiUser.request(originalRequest);
      }
    } catch (e) {
      console.log(e);
    }
  }
  throw error;
}));


export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $apiUser.get<IUser[]>('/user/');
  }

  static async getMe(): Promise<IUser | null> {
    try {
      const response = await $apiUser.get<IUser>('/user/me/');
      return response.data;
    } catch {
      return null;
    }
  }
}
