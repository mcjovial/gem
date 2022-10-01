import { QueryParamsType, TagsQueryOptionsType } from "@ts-types/custom.types";
import { stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Tag from "@repositories/tag";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchTags = async ({
  queryKey,
}: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 15,
    orderBy = "updatedAt",
    sortedBy = "DESC",
  } = params as TagsQueryOptionsType;

  const searchString = stringifySearchQuery({
    name: text,
  });
  const url = `${API_ENDPOINTS.TAGS}?search=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const { data } = await Tag.all(url);
  return {
    tags: { data }
  };
};

const useTagsQuery = (options: TagsQueryOptionsType) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.TAGS, options],
    fetchTags,
    {
      keepPreviousData: true,
    }
  );
};

export { useTagsQuery, fetchTags };
