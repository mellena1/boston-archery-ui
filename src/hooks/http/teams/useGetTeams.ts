import { type ArcheryAPIError } from "../error";
import { useQuery } from "react-query";

import { type HTTPResponse } from "@/hooks/http";
import { type Team } from "@/models/team";

type GetTeamsResp = {
  data: Team[];
} & ArcheryAPIError;

export function useGetTeams(): HTTPResponse<Team[]> {
  const fetchData = async () => {
    const resp = await fetch("http://localhost:3000/api/v1/teams");
    const respParsed = (await resp.json()) as GetTeamsResp;
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
  } = useQuery<Team[], Error>("getTeams", fetchData, {
    retry: 1,
  });

  return {
    data,
    loading,
    error,
    refetch,
  };
}
