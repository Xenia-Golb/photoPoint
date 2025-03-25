export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface ProductsParams {
  limit?: number;
  sort?: "asc" | "desc";
  category?: string;
}
