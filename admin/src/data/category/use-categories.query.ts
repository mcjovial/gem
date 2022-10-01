import {
  QueryParamsType,
  CategoriesQueryOptionsType,
} from "@ts-types/custom.types";
import { stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Category from "@repositories/category";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchCategories = async ({
  queryKey,
}: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 15,
    orderBy = "updatedAt",
    sortedBy = "DESC",
  } = params as CategoriesQueryOptionsType;

  const searchString = stringifySearchQuery({
    name: text,
  });

  const url = `${API_ENDPOINTS.CATEGORIES}?search=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data
  } = await Category.all(url);

  return { categories: { data } };
};

const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategories,
    {
      keepPreviousData: true,
    }
  );
};

export { useCategoriesQuery, fetchCategories };
