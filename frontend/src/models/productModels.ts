// product photo
interface Photo {
  name: string;
  image: string;
}

// product size
interface Size {
  size: string;
  color: string;
  stock_quantity: number;
}

// single product category
interface Category {
  name: string;
  slug: string;
}

// single product
export interface ProductData {
  id: number;
  photos: Photo[];
  sizes: Size[];
  category: Category;
  comments: [];
  name: string;
  price: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  slug: string;
  sex_and_age: string;
  season: string;
}

// all products
export interface Products {
  count: number;
  next: string;
  previous: string;
  results: ProductData[];
}

// getting all product categories
export interface ProductsCategories<T> {
  name: string;
  slug: string;
  sub_categories: ProductsCategories<T> | [];
}
