import { Outlet } from "react-router-dom";
import { AdminTabs } from "@components/admin-tabs";
import { SeasonsSelect } from "@components/seasons-select";

export function AdminLayout() {
  return (
    <div className="px-12">
      <div className="flex justify-end">
        <div className="w-full md:w-1/4">
          <SeasonsSelect />
        </div>
      </div>
      <AdminTabs />
      <Outlet />
    </div>
  );
}
