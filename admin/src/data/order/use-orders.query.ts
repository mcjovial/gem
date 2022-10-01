import { QueryParamsType, QueryOptionsType } from "@ts-types/custom.types";
import { useQuery } from "react-query";
import Orders from "@repositories/type";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchOrders = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page = 1,
    limit = 20,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as QueryOptionsType;
  const url = `${API_ENDPOINTS.ORDERS}?page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data
  } = await Orders.all(url);

  return { orders: { data } };
};

const useOrdersQuery = (params: QueryOptionsType = {}, options: any = {}) => {
  return useQuery<any, Error>([API_ENDPOINTS.ORDERS, params], fetchOrders, {
    ...options,
    keepPreviousData: true,
  });
};

export { useOrdersQuery, fetchOrders };
