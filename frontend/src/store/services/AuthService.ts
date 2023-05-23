import api from "../../http";
import { AxiosResponse } from "axios";
import {
  ResponseLogIn,
  StandartResponse,
  UserAuthorization,
} from "../../models/authModels";
export default class AuthService {
  static async login({
    username,
    password,
  }: UserAuthorization): Promise<AxiosResponse<ResponseLogIn>> {
    return api.post<ResponseLogIn>("/auth/login/", { username, password });
  }

  static async register({
    username,
    password,
    password_confirm,
  }: UserAuthorization): Promise<AxiosResponse<StandartResponse>> {
    return api.post<StandartResponse>("/auth/register", {
      username,
      password,
      password_confirm,
    });
  }
}
