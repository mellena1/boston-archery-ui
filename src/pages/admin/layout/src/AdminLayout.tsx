import { useState } from "react";

import { Outlet } from "react-router-dom";

import { AdminTabs } from "@/components/admin-tabs";
import { type Season } from "@/models/season";
import { SeasonContext } from "@/state/season";

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
        <AdminTabs />
        <Outlet />
      </div>
    </SeasonContext.Provider>
  );
}
