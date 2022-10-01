import {
  QueryParamsType,
  CategoriesQueryOptionsType,
} from '@ts-types/custom.types';
import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import Category from '@repositories/category';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { IPaginator, Category as ICategory } from '@ts-types/generated';

const fetchCategories = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    parent,
    text,
    type,
    limit = 15,
    orderBy = 'updatedAt',
    sortedBy = 'desc',
  } = params as CategoriesQueryOptionsType;
  
  const url = `${API_ENDPOINTS.PARENT_CATEGORIES}?${text && `search=${text}&`}${
    type && `type=${type}`
  }&searchJoin=and&limit=${limit}&${
    parent ? `parent=${parent}` : ''
  }&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { docs, ...rest },
  } = await Category.fetchParent(url);
  return {
    categories: { data: docs, paginatorInfo: rest },
  };
};

const useParentCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<{ categories: IPaginator<ICategory> }, Error>(
    [API_ENDPOINTS.PARENT_CATEGORIES, options],
    fetchCategories,
    {
      keepPreviousData: true,
    }
  );
};

export { useParentCategoriesQuery, fetchCategories };
