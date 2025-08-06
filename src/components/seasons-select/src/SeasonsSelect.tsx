import { useContext } from "react";

import { Select } from "flowbite-react";

import { useGetSeasons } from "@/hooks/http";
import { SeasonContext } from "@/state/season";

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
      onChange={(e) => {
        const idx = e.target.selectedIndex;
        if (showAddSeason) {
          if (idx === 0) {
            setSeason(undefined);
            return;
          }

          setSeason(sortedSeasons[idx - 2]);
          return;
        }
        setSeason(sortedSeasons[idx]);
      }}
      disabled={loadingOrError || (noOptions && !showAddSeason)}
      value={loadingOrError || noOptions ? "disabled" : season?.id}
    >
      {loadingOrError && (
        <option value="disabled" disabled>
          Seasons Loading...
        </option>
      )}
      {noOptions && !showAddSeason && (
        <option value="disabled" disabled>
          No Seasons Exist
        </option>
      )}
      {!loadingOrError && (
        <>
          {showAddSeason && (
            <>
              <option>Add a new season</option>
              <option disabled>{"-".repeat(40)}</option>
            </>
          )}
          {sortedSeasons.map((season) => {
            return (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            );
          })}
        </>
      )}
    </Select>
  );
}
