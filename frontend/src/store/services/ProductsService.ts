import api from "../../http";
import { AxiosResponse } from "axios";
import { ProductData, Products } from "../../models/productModels";

export default class ProductsService {
  static async getProducts(): Promise<AxiosResponse<Products>> {
    return api.get<Products>("/product/");
  }
  static async getOneProduct(slug: string): Promise<AxiosResponse<ProductData>> {
    return api.get<ProductData>(`/product/${slug}`);
  }
}
