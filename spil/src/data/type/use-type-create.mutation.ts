import { CreateTypeInput } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import Type from "@repositories/type";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";

export interface ITypeCreateVariables {
  variables: {
    input: CreateTypeInput;
  };
}

export const useCreateTypeMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ITypeCreateVariables) =>
      Type.create(API_ENDPOINTS.TYPES, input),
    {
      onSuccess: () => {
        router.push(ROUTES.GROUPS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TYPES);
      },
      onError: (error: any) => {
        toast.error(
          typeof error?.response?.data?.message === 'string'
            ? error?.response?.data?.message
            : error?.response?.data?.message?.[0]
        );
      },
    }
  );
};