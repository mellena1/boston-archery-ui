import { useQuery } from "react-query";

import { type HTTPResponse } from "@/hooks/http";
import { type ArcheryAPIError } from "@/hooks/http/error";
import { type Season } from "@/models/season";

type GetSeasonsResp = {
  data: Season[];
} & ArcheryAPIError;

export function useGetSeasons(): HTTPResponse<Season[]> {
  const fetchData = async () => {
    const resp = await fetch("http://localhost:3000/api/v1/seasons");
    const respParsed = (await resp.json()) as GetSeasonsResp;
    if (!resp.ok) {
      throw Error(`${resp.status} status code: ${respParsed.Msg}`);
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
