import axios, { isAxiosError } from "axios";

import { IAuthResponse } from "../interfaces/Auth/IAuthResponse";
import { config } from "../config";


axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['WWW-Authenticate'] = 'Negotiate';

interface CreateUserDto {
  login: string;
  password: string;
  email: string;
  phone: string;
  lastname: string;
  firstname: string;
  role?: "USER" | "MODERATOR" | "ADMIN";
}

const $apiAuth = axios.create({
  baseURL: 
		`http://${config.server.auth.host}:${config.server.auth.port}/api/v1/`,
});

export default class AuthService {
  static async login(login: string, password: string): Promise<string | null>  {
    const response = await $apiAuth.post<IAuthResponse>(
      "user/login/",
      {login, password},
    ).catch((error) => {
      var errorMessage: string;
      if (isAxiosError(error)) {
        if (error.response) {
          errorMessage = `${error.response.data.message}`;
          if (error.response.status === 400) {
            errorMessage += (`: ${error.response.data.errors[0].loc} - `
              +`${error.response.data.errors[0].msg}`);
          }
        } else {
          errorMessage = `${error}`;
        }
        console.log(error);
      } else {
        errorMessage = `NOT AXIOS: ${error}`;
        console.log(`NOT AXIOS: ${error}`);
      }

      return errorMessage;
    });

    if (typeof response === "string") {
      return response;
    } else {
      localStorage.setItem(`accessToken`, response.data.access_token as string);
      localStorage.setItem(`refreshToken`, response.data.refresh_token as string);

      return null;
    }
  }

  static async register({...registerDto}: CreateUserDto): Promise<string | null>  { 
    const response = await $apiAuth.post<IAuthResponse>(
      "user/register/",
      {...registerDto, role: "USER"},
    ).catch((error) => {
      var errorMessage: string;
      if (isAxiosError(error)) {
        if (error.response) {
          errorMessage = `${error.response.data.message}`;
          if (error.response.status === 400) {
            errorMessage += (`: ${error.response.data.errors[0].loc} - `
              +`${error.response.data.errors[0].msg}`);
          }
        } else {
          errorMessage = `${error}`;
        }
        console.log(error);
      } else {
        errorMessage = `NOT AXIOS: ${error}`;
        console.log(`NOT AXIOS: ${error}`);
      }

      return errorMessage;
    });

    if (typeof response === "string") {
      return response;
    } else {
      localStorage.setItem(`accessToken`, response.data.access_token as string);
      localStorage.setItem(`refreshToken`, response.data.refresh_token as string);
      
      return null;
    }
  }

  static logout(): undefined {
    localStorage.clear();
    return;
  }

  static isAuth(): boolean {
    return !!localStorage.getItem(`accessToken`);
  }
}
