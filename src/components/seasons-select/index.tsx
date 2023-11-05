import { useGetSeasons } from "@hooks/http";
import { Select } from "flowbite-react";

export function SeasonsSelect() {
  const { data: seasons, loading, error } = useGetSeasons();

  // most recent season first
  const sortedSeasons = seasons?.sort((a, b) =>
    a.startDate < b.startDate ? 1 : -1,
  );

  const showPlaceholder = loading || error !== null;

  return (
    <Select
      onChange={(e) => {
        console.log(e.target.selectedIndex);
      }}
      disabled={showPlaceholder}
    >
      {showPlaceholder && (
        <option disabled selected>
          Loading...
        </option>
      )}
      {!showPlaceholder &&
        sortedSeasons?.map((season) => {
          return <option key={season.id}>{season.name}</option>;
        })}
    </Select>
  );
}
