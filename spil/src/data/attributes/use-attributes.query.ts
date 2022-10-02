import { QueryParamsType, QueryOptionsType } from "@ts-types/custom.types";
import { useQuery } from "react-query";
import Attribute from "@repositories/attribute";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchAttributes = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    orderBy = "updatedAt",
    sortedBy = "desc",
  } = params as QueryOptionsType;
  const url = `${API_ENDPOINTS.ATTRIBUTES}?orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const { data } = await Attribute.all(url);
  
  return { attributes: data };
};

const useAttributesQuery = (
  params: QueryOptionsType = {},
) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.ATTRIBUTES, params],
    fetchAttributes,
    {
      keepPreviousData: true,
    }
  );
};

export { useAttributesQuery, fetchAttributes };
