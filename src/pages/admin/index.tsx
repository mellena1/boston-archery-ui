import { useState } from "react";

import { Outlet } from "react-router-dom";

import { AdminTabs } from "@components/admin-tabs";
import { SeasonsSelect } from "@components/seasons-select";

import { Season } from "@models/season";

import { SeasonContext } from "@state/season";

export function AdminLayout() {
  const [season, setSeason] = useState<Season | undefined>(undefined);

  return (
    <SeasonContext.Provider
      value={{
        season,
        setSeason,
      }}
    >
      <div className="px-12">
        <div className="flex justify-end">
          <div className="w-full md:w-1/4">
            <SeasonsSelect />
          </div>
        </div>
        <AdminTabs />
        <Outlet />
      </div>
    </SeasonContext.Provider>
  );
}
