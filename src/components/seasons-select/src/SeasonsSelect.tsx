import { useContext } from "react";

import { useGetSeasons } from "@/hooks/http";
import { SeasonContext } from "@/state/season";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SeasonsSelectProps {
  showAddSeason?: boolean;
}

export function SeasonsSelect({ showAddSeason = false }: SeasonsSelectProps) {
  const { data: seasons, loading, error } = useGetSeasons();
  const { season, setSeason } = useContext(SeasonContext);

  // most recent season first
  const sortedSeasons =
    seasons?.sort((a, b) => (a.startDate < b.startDate ? 1 : -1)) ?? [];

  const loadingOrError = loading || error !== null;
  const noOptions = !loadingOrError && sortedSeasons.length === 0;

  return (
    <Select
      onValueChange={(v) => {
        if (v === "add-new") {
          setSeason(undefined);
          return;
        }
        setSeason(sortedSeasons.find((s) => s.id === v));
      }}
      disabled={loadingOrError || (noOptions && !showAddSeason)}
      value={loadingOrError || noOptions ? "disabled" : season?.id}
    >
      <SelectTrigger>
        <SelectValue placeholder={loadingOrError ? "Seasons Loading..." : "Select a season"} />
      </SelectTrigger>
      <SelectContent>
        {loadingOrError && (
          <SelectItem value="disabled" disabled>
            Seasons Loading...
          </SelectItem>
        )}
        {noOptions && !showAddSeason && (
          <SelectItem value="disabled" disabled>
            No Seasons Exist
          </SelectItem>
        )}
        {!loadingOrError && (
          <>
            {showAddSeason && (
              <>
                <SelectItem value="add-new">Add a new season</SelectItem>
                <SelectItem value="disabled-separator" disabled>{"-".repeat(40)}</SelectItem>
              </>
            )}
            {sortedSeasons.map((season) => {
              return (
                <SelectItem key={season.id} value={season.id}>
                  {season.name}
                </SelectItem>
              );
            })}
          </>
        )}
      </SelectContent>
    </Select>
  );
}