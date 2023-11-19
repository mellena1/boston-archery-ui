import { UseMutationResult, UseQueryResult } from "react-query";

export * from "./seasons";

export interface HTTPResponse<T> {
  data?: T;
  loading: boolean;
  error: Error | null;
  refetch: UseQueryResult["refetch"];
}

export interface HTTPMutateResponse<InputT, RespT> {
  data?: RespT;
  loading: boolean;
  error: Error | undefined;
  mutate: UseMutationResult<RespT, unknown, InputT>["mutate"];
}
