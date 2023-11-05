import { UseQueryResult } from "react-query";

export * from "./useGetSeasons";

export interface HTTPResponse<T> {
  data?: T;
  loading: boolean;
  error: Error | null;
  refetch: UseQueryResult["refetch"];
}
