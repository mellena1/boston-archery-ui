import React from "react";

import { useGetTeams } from "@/hooks/http";
import { type Team } from "@/models/team";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      onValueChange={(v) => {
        if (v === "add-new") {
          setSelectedTeam(undefined);
          return;
        }
        setSelectedTeam(sortedTeams.find((t) => t.id === v));
      }}
      disabled={loadingOrError || (noOptions && !showAddTeam)}
      value={loadingOrError || noOptions ? "disabled" : selectedTeamId}
    >
      <SelectTrigger>
        <SelectValue placeholder={loadingOrError ? "Teams Loading..." : "Select a team"} />
      </SelectTrigger>
      <SelectContent>
        {loadingOrError && (
          <SelectItem value="disabled" disabled>
            Teams Loading...
          </SelectItem>
        )}
        {noOptions && !showAddTeam && (
          <SelectItem value="disabled" disabled>
            No Teams Exist
          </SelectItem>
        )}
        {!loadingOrError && (
          <>
            {showAddTeam && (
              <>
                <SelectItem value="add-new">Add a new team</SelectItem>
                <SelectItem value="disabled-separator" disabled>{"-".repeat(40)}</SelectItem>
              </>
            )}
            {sortedTeams.map((team) => {
              return (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              );
            })}
          </>
        )}
      </SelectContent>
    </Select>
  );
}
