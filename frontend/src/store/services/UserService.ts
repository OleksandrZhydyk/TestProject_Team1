import api from "../../http";
import { AxiosResponse } from "axios";
import { UserData } from "../../models/userModel";
export default class UserService {
  static async getUserData(): Promise<AxiosResponse<UserData>> {
    return api.get<UserData>("/me/");
  }
}
