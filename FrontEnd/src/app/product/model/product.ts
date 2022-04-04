import { Category } from "./category";

export interface Product {
  idProduct?: number;
  nameProduct?: string;
  priceProduct?: number;
  imgUrl?: string;
  category?: Category;
}
