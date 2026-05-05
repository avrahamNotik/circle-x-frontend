import { useQuery, type QueryFunction } from "@tanstack/react-query";
import { queryKeys } from "./kueryeKeys";

type QueryKeyValue = (typeof queryKeys)[keyof typeof queryKeys];

interface Props<T> {
  queryKey: QueryKeyValue[];
  queryFn: QueryFunction<T>;
}
export function useGenericQuery<T>({ queryKey, queryFn }: Props<T>) {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: 0,
  });
}
