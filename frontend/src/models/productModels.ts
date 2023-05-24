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
  sizes?: Size[];
  category?: Category;
  comments?: [];
  name: string;
  price: number;
  description: string;
  created_at: string;
  updated_at: string;
  slug: string;
  sex_and_age: string;
  season: string;
}

// all products
export interface Products {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductData[];
}

// getting all product categories
export interface ProductsCategories {
  name: string;
  slug: string;
  sub_categories: Array<ProductsCategories> | [];
}
