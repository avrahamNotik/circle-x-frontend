import type { queryKeys } from "../query/kueryeKeys";

export type Player = {
  firstName: string;
  lastName: string;
  email: string;
  birthDay?: string;
};
export type QueryKeyValue = (typeof queryKeys)[keyof typeof queryKeys];
