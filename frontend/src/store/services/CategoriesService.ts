import api from "../../http";
import { AxiosResponse } from "axios";
import { ProductsCategories } from "../../models/productModels";

export default class CategoriesService {
  static async getCategories(): Promise<AxiosResponse<ProductsCategories>> {
    return api.get<ProductsCategories>("/product/category/");
  }
}
