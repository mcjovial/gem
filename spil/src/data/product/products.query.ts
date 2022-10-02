import {
  QueryParamsType,
  ProductsQueryOptionsType,
} from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Product from "@repositories/product";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchProducts = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    category,
    status,
    limit = 15,
    orderBy = "updatedAt",
    sortedBy = "DESC",
  } = params as ProductsQueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
    category,
    status,
  });
  const url = `${API_ENDPOINTS.PRODUCTS}?search=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data
  } = await Product.all(url);
  console.log('ppp', data);
  
  return { products: { data } };
};

const useProductsQuery = (
  params: ProductsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<any, Error>([API_ENDPOINTS.PRODUCTS, params], fetchProducts, {
    ...options,
    keepPreviousData: true,
  });
};

export { useProductsQuery, fetchProducts };
