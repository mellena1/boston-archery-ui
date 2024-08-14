import { HTTPMutateResponse } from "..";
import { useMutation } from "react-query";

import { useAuthToken } from "@hooks/auth";
import { ArcheryAPIError } from "@hooks/http/error";

import { Season } from "@models/season";

export interface AddNewSeasonInput {
  name: string;
  startDate: string;
  endDate: string;
  byeWeeks: string[] | undefined;
}

type AddSeasonResp = {
  data: Season;
} & ArcheryAPIError;

export interface UseAddSeasonParams {
  onSuccess?: () => void;
}

export function useAddSeason({
  onSuccess,
}: UseAddSeasonParams = {}): HTTPMutateResponse<AddNewSeasonInput, Season> {
  const [authState] = useAuthToken();

  const fetchFunc = async (season: AddNewSeasonInput) => {
    const resp = await fetch("http://localhost:3000/api/v1/season", {
      method: "POST",
      body: JSON.stringify({
        name: season.name,
        startDate: season.startDate,
        endDate: season.endDate,
        byeWeeks: season.byeWeeks,
      }),
      headers: {
        Authorization: `Bearer ${authState?.jwt ?? ""}`,
        "Content-Type": "application/json",
      },
    });
    const respParsed = (await resp.json()) as AddSeasonResp;

    if (!resp.ok) {
      throw Error(`${resp.status} status code: ${respParsed.Msg}`);
    }

    return respParsed.data;
  };

  const { isLoading, data, mutate, error } = useMutation({
    mutationFn: fetchFunc,
    onSuccess,
  });

  return {
    loading: isLoading,
    data,
    mutate,
    error: error === null ? undefined : (error as Error),
  };
}
