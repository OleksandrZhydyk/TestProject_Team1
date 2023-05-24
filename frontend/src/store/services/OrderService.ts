import api from "../../http";
import { AxiosResponse } from "axios";
import { MakeOrderRequest } from "../../models/productOrderModel";
import { StandartResponse } from "../../models/authModels";

export default class OrderService {
  static async makeOrder(
    array: MakeOrderRequest[]
  ): Promise<AxiosResponse<StandartResponse>> {
    return api.post<StandartResponse>("/makeorder/", array);
  }
}
