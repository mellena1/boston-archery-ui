import { HTTPResponse } from ".";
import { useQuery } from "react-query";

import { Season } from "@models/season";

import { ArcheryAPIError } from "./error";

type GetSeasonsResp = {
  data: Season[];
} & ArcheryAPIError;

export function useGetSeasons(): HTTPResponse<Season[]> {
  const fetchData = async () => {
    const resp = await fetch("http://localhost:3000/api/v1/seasons");
    const respParsed = (await resp.json()) as GetSeasonsResp;
    if (!resp.ok) {
      throw new Error(`${resp.status} status code: ` + respParsed.msg);
    }
    return respParsed.data;
  };

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<Season[], Error>("getSeasons", fetchData, {
    retry: 1,
  });

  return {
    data,
    loading,
    error,
    refetch,
  };
}
