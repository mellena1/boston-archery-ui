import { HTTPMutateResponse } from "..";
import { useMutation } from "react-query";

import { useAuthToken } from "@hooks/auth";
import { ArcheryAPIError } from "@hooks/http/error";

import { Season } from "@models/season";

export interface UpdateSeasonInput {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  byeWeeks: string[] | undefined;
}

type UpdateSeasonResp = {
  data: Season;
} & ArcheryAPIError;

export interface UseUpdateSeasonParams {
  onSuccess?: () => void;
}

export function useUpdateSeason({
  onSuccess,
}: UseUpdateSeasonParams = {}): HTTPMutateResponse<UpdateSeasonInput, Season> {
  const [authState] = useAuthToken();

  const fetchFunc = async (season: UpdateSeasonInput) => {
    const resp = await fetch(
      `http://localhost:3000/api/v1/seasons/${season.id}`,
      {
        method: "PUT",
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
      },
    );
    const respParsed = (await resp.json()) as UpdateSeasonResp;

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
    error: error as Error,
  };
}
