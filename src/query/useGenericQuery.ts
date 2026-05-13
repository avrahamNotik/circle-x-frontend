import { useQuery, type QueryFunction } from "@tanstack/react-query";
import type { QueryKeyValue } from "../utils/commonType";

interface Props<T> {
  queryKey: QueryKeyValue[];
  queryFn: QueryFunction<T>;
}
export function useGenericQuery<T>({ queryKey, queryFn }: Props<T>) {
  return useQuery({
    queryKey,
    queryFn,
    retry: false,
    staleTime: 0,
  });
}
