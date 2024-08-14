import React from "react";

import { Select } from "flowbite-react";

import { useGetTeams } from "@hooks/http";

import { Team } from "@models/team";

export interface TeamsSelectProps {
  showAddTeam?: boolean;
  selectedTeamId: string | undefined;
  setSelectedTeam: React.Dispatch<Team | undefined>;
}

export function TeamsSelect({
  showAddTeam = false,
  selectedTeamId,
  setSelectedTeam,
}: TeamsSelectProps) {
  const { data: teams, loading, error } = useGetTeams();

  const sortedTeams = teams?.sort((a, b) => (a.name < b.name ? 1 : -1)) ?? [];

  const loadingOrError = loading || error !== null;
  const noOptions = !loadingOrError && sortedTeams.length === 0;

  return (
    <Select
      onChange={(e) => {
        const idx = e.target.selectedIndex;
        if (showAddTeam) {
          if (idx === 0) {
            setSelectedTeam(undefined);
            return;
          }

          setSelectedTeam(sortedTeams[idx - 2]);
          return;
        }
      }}
      disabled={loadingOrError || (noOptions && !showAddTeam)}
      value={loadingOrError || noOptions ? "disabled" : selectedTeamId}
    >
      {loadingOrError && (
        <option value="disabled" disabled>
          Teams Loading...
        </option>
      )}
      {noOptions && !showAddTeam && (
        <option value="disabled" disabled>
          No Teams Exist
        </option>
      )}
      {!loadingOrError && (
        <>
          {showAddTeam && (
            <>
              <option>Add a new team</option>
              <option disabled>{"-".repeat(40)}</option>
            </>
          )}
          {sortedTeams.map((team) => {
            return (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            );
          })}
        </>
      )}
    </Select>
  );
}
