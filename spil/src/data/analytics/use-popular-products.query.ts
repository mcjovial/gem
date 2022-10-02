import { useQuery } from "react-query";
import Product from "@repositories/product";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { Product as TProduct } from "@ts-types/generated";

const fetchPopularProducts = async () => {
  const limit = 15
  const url = `${API_ENDPOINTS.POPULAR_PRODUCTS}?limit=${limit}`;
  const { data } = await Product.popularProducts(url);
  return data;
};

const usePopularProductsQuery = (options: {
  limit: number;
  shop_id?: number;
}) => {
  return useQuery<TProduct[], Error>(
    [API_ENDPOINTS.POPULAR_PRODUCTS, options],
    fetchPopularProducts
  );
};

export { usePopularProductsQuery, fetchPopularProducts };
