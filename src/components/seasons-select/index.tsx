import { useGetSeasons } from "@hooks/http";
import { SeasonContext } from "@state/season";
import { Select } from "flowbite-react";
import { useContext } from "react";

export function SeasonsSelect() {
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
        setSeason(sortedSeasons[e.target.selectedIndex]);
      }}
      disabled={loadingOrError || noOptions}
      value={loadingOrError || noOptions ? "disabled" : season?.id}
    >
      {loadingOrError && (
        <option value="disabled" disabled>
          Seasons Loading...
        </option>
      )}
      {noOptions && (
        <option value="disabled" disabled>
          No Seasons Exist
        </option>
      )}
      {!loadingOrError &&
        !noOptions &&
        sortedSeasons.map((season) => {
          return (
            <option key={season.id} value={season.id}>
              {season.name}
            </option>
          );
        })}
    </Select>
  );
}
