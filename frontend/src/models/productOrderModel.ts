import { Photo } from "./productModels";

export interface MakeOrderRequest {
  id: number;
  slug: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface SaveInBag {
  id: number;
  slug: string;
  quantity: number;
  color: string;
  size: string;
  price: number;
  name: string;
  description: string;
  photos: Photo[];
  stock_quantity: number;
}