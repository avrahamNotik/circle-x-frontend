import {
  useMutation,
  useQueryClient,
  type MutationFunction,
} from "@tanstack/react-query";
import type { QueryKeyValue } from "../utils/commonType";

interface Props<TData, TVariables> {
  mutationFn: MutationFunction<TData, TVariables>;
  mutationKey: readonly QueryKeyValue[];
}
export function useGenericMutation<TData, TVariables>({
  mutationFn,
  mutationKey,
}: Props<TData, TVariables>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mutationKey });
    },
  });
}
